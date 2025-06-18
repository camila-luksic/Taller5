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
exports.listCurso = async (req, res) => {
    try {
        const cursos = await db.cursos.findAll(
             {
                            include: {
                              model: db.videos, 
                              attributes: ['id','titulo','url_video','orden_video'], 
                              order: [['orden_video', 'ASC']], 
                            },
                          }
        );
        res.json(cursos);
    } catch (error) {
        sendError500(error);
    }
}
exports.listCursosPorProfesor = async (req, res) => {
    const { profesor_id } = req.params;
    try {
        const cursos = await db.cursos.findAll({
            where: { profesor_id },
            include: {
                model: db.videos,
                attributes: ['id', 'titulo', 'url_video', 'orden_video'],
                order: [['orden_video', 'ASC']]
            }
        });
        res.json(cursos);
    } catch (error) {
        sendError500(res, error);
    }
};


exports.getCursoById = async (req, res) => {
    const id = req.params.id;
    try {
        const curso = await getCursoOr404(id, res);
        if (!curso) {
            return;
        }
        res.json(curso);
    } catch (error) {
        sendError500(error);
    }
}

exports.createCurso = async (req, res) => {
//Falta agregar profersor_di
    const requiredFields = ['nombre','descripcion','categoria_id','profesor_id'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    if (!req.body.profesor_id) {
        return res.status(400).json({ error: 'El profesor_id es obligatorio' });
    }
    try {

        const curso = {
            nombre: req.body.nombre,
            descripcion:req.body.descripcion,
            categoria_id:req.body.categoria_id,
            profesor_id:req.body.profesor_id
        }
        const cursoCreada = await db.cursos.create(curso);

        res.status(201).json(cursoCreada);
    } catch (error) {
        sendError500(res,error);
    }
}
exports.updateCursoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const curso = await getCursoOr404(id, res);
        if (!curso) {
            return;
        }
        curso.nombre = req.body.nombre || curso.nombre;
        curso.descripcion = req.body.descripcion || curso.descripcion;
        curso.categoria_id = req.body.categoria_id || curso.categoria_id;


        await curso.save();
        res.json(curso);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateCursoPut = async (req, res) => {
    const id = req.params.id;
    try {
        const curso = await getCursoOr404(id, res);
        if (!curso) {
            return;
        }
        const requiredFields = ['nombre','descripcion','categoria_id'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        curso.nombre = req.body.nombre;
        curso.descripcion = req.body.descripcion ;
        curso.categoria_id = req.body.categoria_id ;

        await curso.save();

        res.json(curso);
    } catch (error) {
        sendError500(error);
    }
}
exports.deleteCurso = async (req, res) => {
    const id = req.params.id;
    try {
        const curso = await getCursoOr404(id, res);
        if (!curso) {
            return;
        }
        await db.videos.destroy({
            where: { curso_id: id }
        });

        await db.inscripciones.destroy({ where: { curso_id: id } });
        await db.notas.destroy({ where: { curso_id: id } });
        await db.comentarios.destroy({ where: { curso_id: id } });

        await curso.destroy();
        res.json({
            msg: 'Curso eliminado correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}
async function getCursoOr404(id, res) {
    const curso = await db.cursos.findByPk(id,
        {
            include: {
                model: db.videos,
                attributes: ['id', 'titulo', 'url_video', 'orden_video'],
                order: [['orden_video', 'ASC']], 
            },
        }

    );
    if (!curso) {
        res.status(404).json({
            msg: 'Curso no encontrado'
        });
        return;
    }
    return curso;
}
exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const curso = await getCursoOr404(id, res);
        if (!curso) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.fotoPerfil;
        const fileName = curso.id + '.jpg';
        file.mv(`public/cursos/${fileName}`);
        await curso.save();
        res.json(curso);
    } catch (error) {
        sendError500(error);
    }
}