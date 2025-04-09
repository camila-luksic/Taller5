module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/cateogoria.controller");

    router.get('/', controller.listCategoria);
    router.get('/:id', controller.getCategoriaById);
    router.post('/', controller.createCategoria);
    router.put('/:id', controller.updateCategoriaPut);
    router.patch('/:id', controller.updateCategoriaPatch);
    router.delete('/:id', controller.deleteCategoria);
    app.use('/categorias', router);

};