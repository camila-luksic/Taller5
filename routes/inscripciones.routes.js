module.exports = app => {
    const router = require("express").Router();
    const inscripcionController = require("../controllers/inscripcion.controller");

    // Inscribir un estudiante en un curso
    router.post('/', inscripcionController.inscribirse);

    // Obtener los cursos en los que está inscrito un estudiante
    router.get('/estudiante/:estudiante_id', inscripcionController.obtenerInscripcionesUsuario);
    // Obtener los estudiantes inscritos en un curso
    router.get('/curso/:curso_id', inscripcionController.obtenerInscripcionesCurso);


    app.use('/inscripciones', router);
};
