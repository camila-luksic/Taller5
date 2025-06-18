module.exports = app => {
    const router = require("express").Router();
    const certificadoController = require("../controllers/certificado.controller");

    // Agregar certificado a un curso
    router.post('/', certificadoController.agregarCertificado);

    // Obtener certificados de un curso
    router.get('/curso/:curso_id', certificadoController.obtenerCertificadosCurso);

    // Obtener certificados de un estudiante
    router.get('/estudiante/:estudiante_id', certificadoController.obtenerCertificadosEstudiante);

    // Actualizar certificado
    router.put('/:id', certificadoController.actualizarCertificado);

    // Eliminar certificado
    router.delete('/:id', certificadoController.eliminarCertificado);

    app.use('/certificados', router);
}