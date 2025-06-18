module.exports = app => {
    const router = require("express").Router();
    const notaController = require("../controllers/nota.controller");

    // Asignar o actualizar notas de un estudiante en un curso
    router.post('/asignar', notaController.asignarNota);

    // Obtener todas las notas de un estudiant
    router.get('/usuario/:id', notaController.verNotasUsuario);
// Obtener todas las notas de un estudiante por curso
    router.get('/usuario/:estudiante_id/curso/:curso_id', notaController.verNotaPorCurso);


    app.use('/notas', router);
};
