const{ verifyToken, isAdmin } = require("../middlewares/authJws.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/usuario.controller.js");

    router.get("/",  verifyToken, isAdmin, controller.listUsuario);
    router.get("/:id", verifyToken, isAdmin, controller.getUsuarioById);
    router.post("/", verifyToken, isAdmin, controller.createUsuario);
    router.put("/:id", verifyToken, isAdmin, controller.updateUsuarioPut);
    router.patch("/:id", verifyToken, isAdmin, controller.updateUsuarioPatch);
    router.delete("/:id", verifyToken, isAdmin, controller.deleteUsuario);

    app.use('/api/usuario', router);
    

};