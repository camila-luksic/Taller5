const db = require('../models');
const sha1 = require('sha1');

const jwt = require("jsonwebtoken");
const Usuario = db.usuarios;


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try{
        const usuario = await Usuario.findOne({
            where: {
                username: username,
                password: sha1(password)
            },
            include:['rol']

        });
        if (!usuario) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ 
            token,
            user: {
                id: usuario.id,
                username: usuario.username,
                rol: usuario.rol.nombre
            }
        });
    }catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}