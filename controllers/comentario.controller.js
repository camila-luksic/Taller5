const db = require('../models');
exports.agregarComentario = async (req, res) => {
  const { estudiante_id, curso_id, comentario, fecha } = req.body;
  console.log(req.body);

  try {
    const comentarioo = await db.comentarios.create({ estudiante_id, curso_id, comentario, fecha });
    res.status(201).json(comentarioo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerComentariosCurso = async (req, res) => {
   
  const curso_id = req.params.curso_id;
  try {
    const comentarios = await db.comentarios.findAll({ 
      where: { curso_id },
      order: [['fecha', 'DESC']]
    });
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
