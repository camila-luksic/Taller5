
const db = require("../models");
exports.inscribirse = async (req, res) => {
  const { estudiante_id, curso_id } = req.body;
  console.log(req.body)

  try {
    const yaInscrito = await db.inscripciones.findOne({ where: { estudiante_id, curso_id } });
    if (yaInscrito) return res.status(400).json({ msg: "Ya estás inscrito en este curso." });

    const inscripcion = await db.inscripciones.create({ estudiante_id, curso_id });
    res.status(201).json(inscripcion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerInscripcionesUsuario = async (req, res) => {
    const estudiante_id = req.params.estudiante_id;
  console.log(estudiante_id)
  try {
    const inscripciones = await db.inscripciones.findAll({ where: { estudiante_id } });
    res.json(inscripciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.obtenerInscripcionesCurso = async (req, res) => {
    const curso_id = req.params.curso_id;
  console.log(curso_id)
  try {
    const inscripciones = await db.inscripciones.findAll({ where: { curso_id } });
    res.json(inscripciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
