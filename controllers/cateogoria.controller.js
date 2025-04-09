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
exports.listCategoria = async (req, res) => {
    try {
        const categorias = await db.categorias.findAll(
            {
                include: {
                  model: db.cursos, // Incluir los cursos relacionados
                  attributes: ['id','nombre','descripcion'], // Obtener solo los campos que queremos
                },
              }
        );
        res.json(categorias);
    } catch (error) {
        sendError500(error);
    }
}

exports.getCategoriaById = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await getCategoriaOr404(id, res);
        if (!categoria) {
            return;
        }
        res.json(categoria);
    } catch (error) {
        sendError500(error);
    }
}

exports.createCategoria = async (req, res) => {

    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

        const categoria = {
            nombre: req.body.nombre
        }
        const categoriaCreada = await db.categorias.create(categoria);

        res.status(201).json(categoriaCreada);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateCategoriaPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await getCategoriaOr404(id, res);
        if (!categoria) {
            return;
        }
        categoria.nombre = req.body.nombre || categoria.nombre;

        await categoria.save();
        res.json(categoria);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateCategoriaPut = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await getCategoriaOr404(id, res);
        if (!categoria) {
            return;
        }
        const requiredFields = ['nombre'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        categoria.nombre = req.body.nombre;

        await categoria.save();

        res.json(categoria);
    } catch (error) {
        sendError500(error);
    }
}
exports.deleteCategoria = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await getCategoriaOr404(id, res);
        if (!categoria) {
            return;
        }
        await categoria.destroy();
        res.json({
            msg: 'Categoria eliminado correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}
async function getCategoriaOr404(id, res) {
    const categoria = await db.categorias.findByPk(id);
    if (!categoria) {
        res.status(404).json({
            msg: 'Categoria no encontrada'
        });
        return;
    }
    return categoria;
}