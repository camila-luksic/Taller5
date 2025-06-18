const db = require('../models');

exports.agregarProgreso = async (req, res) => {
    const { curso_id, estudiante_id, progreso } = req.body;
    console.log(req.body);
    
    try {
        const progresoNuevo = await db.progreso.create({ curso_id, estudiante_id, progreso });
        res.status(201).json(progresoNuevo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.obtenerProgresoEstudiante = async (req, res) => {
    const estudiante_id = req.params.estudiante_id;
    try {
        const progreso = await db.progreso.findAll({ 
            where: { estudiante_id },
            order: [['createdAt', 'DESC']]
        });
        res.json(progreso);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.obtenerProgresoCurso = async (req, res) => {
    const curso_id = req.params.curso_id;
    try {
        const progreso = await db.progreso.findAll({ 
            where: { curso_id },
            order: [['createdAt', 'DESC']]
        });
        res.json(progreso);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.actualizarProgreso = async (req, res) => {
    const { id } = req.params;
    const { curso_id, estudiante_id, progreso } = req.body;
    try {
        const progresoExistente = await db.progreso.findByPk(id);
        if (!progresoExistente) {
            return res.status(404).json({ message: 'Progreso no encontrado' });
        }
        progresoExistente.curso_id = curso_id;
        progresoExistente.estudiante_id = estudiante_id;
        progresoExistente.progreso = progreso;
        await progresoExistente.save();
        res.json(progresoExistente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.eliminarProgreso = async (req, res) => {
    const { id } = req.params;
    try {
        const progreso = await db.progreso.findByPk(id);
        if (!progreso) {
            return res.status(404).json({ message: 'Progreso no encontrado' });
        }
        await progreso.destroy();
        res.json({ message: 'Progreso eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.obtenerProgresoPorEstudianteYCurso = async (req, res) => {
    const { estudiante_id, curso_id } = req.params;
    try {
        const progreso = await db.progreso.findOne({ 
            where: { estudiante_id, curso_id }
        });
        if (!progreso) {
            return res.status(404).json({ message: 'Progreso no encontrado' });
        }
        res.json(progreso);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}