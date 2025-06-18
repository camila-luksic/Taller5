const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const Usuario = db.usuarios;


require("dotenv").config();


const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided!" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Token malformado!" });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido!" });
    }
};


const isAdmin = async (req, res, next) => {
    const usuario = await Usuario.findByPk(req.userId, {
        include: ["rol"],
    });
    if (!usuario) {
        return res.status(404).send({ message: "Usuario no encontrado" });
    }
    if (usuario.rol.nombre === "administrador") {
        next();
        return;
    }
    if (usuario.rol.nombre === "profesor") {
        next();
        return;
    }
    res.status(403).send({ message: "Requiere rol de administrador!" });
}
module.exports = {
    verifyToken,
    isAdmin,
  };