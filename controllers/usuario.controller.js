const db = require('../models');
const { sendError500, isRequestValid } = require('../utils/request.utils');
const sha1 = require('sha1');


exports.listUsuario = async (req, res) => {
    try {
        const usuarios = await db.usuarios.findAll({
            include: [
                {
                    model: db.roles,
                    as: 'rol',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.status(200).json(usuarios);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.getUsuarioById = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await db.usuarios.findByPk(id, {
            include: [
                {
                    model: db.roles,
                    as: 'rol',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.createUsuario = async (req, res) => {
    const requiredFields = ['username', 'nombre', 'apellido', 'email', 'password', 'rolId'];
    
    if(!isRequestValid(requiredFields, req.body, res)){
        return;
    }
    
    try{
        const username = req.body.username;
        const email = req.body.email;
        const usernameExist = await db.usuarios.findOne({
            where: {
                username : username
            }
        });
        const emailExist = await db.usuarios.findOne({
            where: {
                email: email
            }
        });

        if (usernameExist) {
            return res.status(400).json({ message: 'El nombre de usuario ya existe' });
        }
        if (emailExist) {
            return res.status(400).json({ message: 'El correo electrónico ya existe' });
        }
        // Verificar si el rol existe
        const rolId = req.body.rolId;
        const rol = await db.roles.findByPk(rolId);

        if (!rol) {
            return res.status(400).json({ message: 'El rol no existe' });
        }
        
        // Crear el usuario
        const usuario = {
            username: req.body.username,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: sha1(req.body.password),
            rolId: req.body.rolId
        };
        const nuevoUsuario = await db.usuarios.create(usuario);
        res.status(201).json(nuevoUsuario);
    }catch (error) {
        sendError500(res, error);
    }
}

exports.updateUsuarioPatch = async (req, res) => {
    const id = req.params.id;
    try{
        const usuario = await getUsuarioOr404(id, res);
        if (!usuario) {
            return;
        }
        const email = req.body.email;

        const usuarioExist = await db.usuarios.findOne({
            where: {
                email: email
            }
        });
        if(usuarioExist && usuarioExist.id !== usuario.id){
            return res.status(400).json({
                message: 'El correo electrónico ya existe'
            });
        }
        usuario.email = req.body.email || usuario.email;

        await usuario.save();
        res.status(200).json(usuario);
    }catch (error) {
        sendError500(res, error);
    }
}

exports.updateUsuarioPut = async (req, res) => {
    const id = req.params.id;
    try{
        const usuario = await getUsuarioOr404(id, res);
        if (!usuario) {
            return;
        }
        const requiredFields = ['username', 'nombre', 'apellido', 'email','rolId'];
        if(!isRequestValid(requiredFields, req.body, res)){
            return;
        }
        const email = req.body.email;
        const username = req.body.username;
        const usernameExist = await db.usuarios.findOne({
            where: {
                username : username
            }
        });
        const emailExist = await db.usuarios.findOne({
            where: {
                email: email
            }
        });

        if (usernameExist) {
            return res.status(400).json({ message: 'El nombre de usuario ya existe' });
        }
        if (emailExist) {
            return res.status(400).json({ message: 'El correo electrónico ya existe' });
        }
        // Verificar si el rol existe
        const rolId = req.body.rolId;
        const rol = await db.roles.findByPk(rolId);
        if (!rol) {
            return res.status(400).json({ message: 'El rol no existe' });
        }
        // Actualizar el usuario
        usuario.username = req.body.username;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        await usuario.save();
        res.status(200).json(usuario);

    }catch (error) {
        sendError500(res, error);
    }
}

exports.updatePassword = async(req, res) => {
    const id = req.params.id;
    try{
        const usuario = await getUsuarioOr404(id, res);
        if (!usuario) {
            return;
        }
        const requiredFields = ['password'];
        if(!isRequestValid(requiredFields, req.body, res)){
            return;
        }
        // Actualizar el usuario
        usuario.password = sha1(req.body.password);
        await usuario.save();
        res.status(200).json(usuario);

    }catch (error) {
        sendError500(res, error);
    }
}

exports.deleteUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await getUsuarioOr404(id, res);
        if (!usuario) {
            return;
        }
        await usuario.destroy();
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        sendError500(res, error);
    }
}
async function getUsuarioOr404(id, res) {
    const usuario = await db.usuarios.findByPk(id);
    if (!usuario) {
        res.status(404).json({
            msg: 'Usuario no encontrado'
        });
        return;
    }
    return usuario;
}