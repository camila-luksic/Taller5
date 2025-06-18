module.exports = app => {
    const router = require("express").Router();
    const progresoController = require("../controllers/progreso.controller");

    // Crear progreso
    router.post('/', progresoController.agregarProgreso);

    // Obtener progreso por curso y estudiante
    router.get('/curso/:curso_id/estudiante/:estudiante_id', progresoController.obtenerProgresoPorEstudianteYCurso);

    // Obtener progreso por estudiante
    router.get('/estudiante/:estudiante_id', progresoController.obtenerProgresoEstudiante);

    // Obtener progreso por curso
    router.get('/curso/:curso_id', progresoController.obtenerProgresoCurso);

    // Actualizar progreso
    router.put('/:id', progresoController.actualizarProgreso);

    // Eliminar progreso
    router.delete('/:id', progresoController.eliminarProgreso);



    app.use('/progreso', router);
}