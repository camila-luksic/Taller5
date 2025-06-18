module.exports = app => {
    const router = require("express").Router();
    const comentarioController = require("../controllers/comentario.controller");

    // Agregar comentario a un curso
    router.post('/', comentarioController.agregarComentario);

    // Obtener comentarios de un curso
    router.get('/curso/:curso_id', comentarioController.obtenerComentariosCurso);

    app.use('/comentarios', router);
};
