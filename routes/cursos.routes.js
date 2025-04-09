module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/cursos.controller");

    router.get('/', controller.listCurso);
    router.get('/:id', controller.getCursoById);
    router.post('/', controller.createCurso);
    router.put('/:id', controller.updateCursoPut);
    router.patch('/:id', controller.updateCursoPatch);
    router.delete('/:id', controller.deleteCurso);
    router.post('/:id/foto', controller.uploadPicture);
    app.use('/cursos', router);

};