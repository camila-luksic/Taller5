//const e = require('express');
const db = require('../models');
const { sendError500 } = require('../utils/request.utils');


//listas roles
exports.listRol = async (req, res) => {
    try {
        const roles = await db.roles.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los roles' });
    }
}

//get rol by id
exports.getRolById = async (req, res) => {
    const id = req.params.id;
    try {
        const rol = await db.roles.findByPk(id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(rol);
    } catch (error) {
        sendError500(res, error);
    }
}

//crear rol
exports.createRol = async (req, res) => {
    const rol = req.body;
    try{
        const nuevoRol = await db.roles.create(rol);
        res.status(201).json(nuevoRol);

    } catch (error) {
        sendError500(res, error);
    }
}

exports.updateRol= async (req, res) => {
    const id = req.params.id;
    try {
        const rol = await db.roles.findByPk(id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        await rol.update(req.body);
        res.status(200).json(rol);
    }catch (error) {
        sendError500(res, error);
    }
}

exports.deleteRol = async (req, res) => {
    const id = req.params.id;
    try {
        const rol = await db.roles.findByPk(id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        await rol.destroy();
        res.status(200).json({ message: 'Rol eliminado' });
    } catch (error) {
        sendError500(res, error);
    }
}



