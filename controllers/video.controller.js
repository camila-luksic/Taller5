const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor
exports.listVideo = async (req, res) => {
    try {
        const videos = await db.videos.findAll();
        res.json(videos);
    } catch (error) {
        sendError500(error);
    }
}

exports.getVideoById = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await getVideoOr404(id, res);
        if (!video) {
            return;
        }
        res.json(video);
    } catch (error) {
        sendError500(error);
    }
}

exports.createVideo = async (req, res) => {

    const requiredFields = ['titulo','url_video','orden_video','curso_id'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

        const video = {
            titulo: req.body.titulo,
            url_video:req.body.url_video,
            orden_video:req.body.orden_video,
            curso_id:req.body.curso_id
        }
        const videoCreada = await db.videos.create(video);

        res.status(201).json(videoCreada);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateVideoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await getVideoOr404(id, res);
        if (!video) {
            return;
        }
        video.titulo = req.body.titulo|| video.titulo;
        video.url_video = req.body.url_video|| video.url_video;
        video.orden_video = req.body.orden_video|| video.orden_video;
        video.curso_id = req.body.curso_id|| video.curso_id;

        await video.save();
        res.json(video);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateVideoPut = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await getVideoOr404(id, res);
        if (!video) {
            return;
        }
        const requiredFields = ['titulo','url_video','orden_video','curso_id'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        video.titulo = req.body.titulo;
        video.url_video = req.body.url_video;
        video.orden_video = req.body.orden_video;
        video.curso_id = req.body.curso_id;

        await video.save();

        res.json(video);
    } catch (error) {
        sendError500(error);
    }
}
exports.deleteVideo = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await getVideoOr404(id, res);
        if (!video) {
            return;
        }
        await video.destroy();
        res.json({
            msg: 'video eliminado correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}
async function getVideoOr404(id, res) {
    const video = await db.videos.findByPk(id);
    if (!video) {
        res.status(404).json({
            msg: 'video no encontrada'
        });
        return;
    }
    return video;
}