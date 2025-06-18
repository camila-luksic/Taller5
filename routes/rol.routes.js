const{ verifyToken, isAdmin } = require("../middlewares/authJws.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/rol.controller.js");
    
    router.get("/", verifyToken, isAdmin,  controller.listRol);
    router.get("/:id", verifyToken, isAdmin,  controller.getRolById);
    router.post("/", verifyToken, isAdmin,  controller.createRol);
    router.put("/:id", verifyToken, isAdmin,  controller.updateRol);
    router.delete("/:id", verifyToken, isAdmin,  controller.deleteRol);

    app.use('/api/rol', router);

};


