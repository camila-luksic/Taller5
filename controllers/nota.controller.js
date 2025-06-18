const db = require("../models");

exports.asignarNota = async (req, res) => {
  const { estudiante_id, curso_id, primer_parcial, segundo_parcial, examen_final } = req.body;

  try {
    const [nota, created] = await db.notas.findOrCreate({
      where: { estudiante_id, curso_id },
      defaults: { primer_parcial, segundo_parcial, examen_final }
    });

    if (!created) {
      await db.notas.update({ primer_parcial, segundo_parcial, examen_final });
    }

    res.status(200).json({ msg: 'Notas registradas con éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verNotasUsuario = async (req, res) => {
  const estudiante_id = req.params.id;
  try {
    const notas = await db.notas.findAll({ where: { estudiante_id } });

    const notasConPromedio = notas.map(n => ({
      ...n.toJSON(),
      promedio: calcularPromedio(n)
    }));

    res.json(notasConPromedio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verNotaPorCurso = async (req, res) => {
    const { estudiante_id, curso_id } = req.params;
    try {
      const nota = await db.notas.findOne({ where: { estudiante_id, curso_id } });
  
      if (!nota) {
        return res.status(404).json({ mensaje: "No se encontró nota para este estudiante en este curso" });
      }
  
      const notaConPromedio = {
        ...nota.toJSON(),
        promedio: calcularPromedio(nota),
      };
  
      res.json(notaConPromedio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

function calcularPromedio(nota) {
  const { primer_parcial, segundo_parcial, examen_final } = nota;
  const notas = [primer_parcial, segundo_parcial, examen_final].filter(n => n != null);
  if (notas.length === 0) return null;

  return parseFloat((notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2));
}
