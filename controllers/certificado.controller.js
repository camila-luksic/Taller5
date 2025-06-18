const db = require('../models');

exports.agregarCertificado = async (req, res) => {
    const { curso_id, estudiante_id, url } = req.body;
    console.log(req.body);
    
    try {
        const certificado = await db.certificados.create({ curso_id, estudiante_id, url });
        res.status(201).json(certificado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.obtenerCertificadosEstudiante = async (req, res) => {
    const estudiante_id = req.params.estudiante_id;
    try {
        const certificados = await db.certificados.findAll({ 
            where: { estudiante_id },
            order: [['createdAt', 'DESC']]
        });
        res.json(certificados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.obtenerCertificadosCurso = async (req, res) => {
    const curso_id = req.params.curso_id;
    try {
        const certificados = await db.certificados.findAll({ 
            where: { curso_id },
            order: [['createdAt', 'DESC']]
        });
        res.json(certificados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.actualizarCertificado = async (req, res) => {
    const { id } = req.params;
    const { curso_id, estudiante_id, url } = req.body;
    try {
        const certificado = await db.certificados.findByPk(id);
        if (!certificado) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }
        certificado.curso_id = curso_id;
        certificado.estudiante_id = estudiante_id;
        certificado.url = url;
        await certificado.save();
        res.json(certificado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.eliminarCertificado = async (req, res) => {
    const { id } = req.params;
    try {
        const certificado = await db.certificados.destroy({ where: { id } });
        if (!certificado) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }
        res.json({ message: 'Certificado eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
