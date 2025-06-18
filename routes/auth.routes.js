const{ verifyToken, isAdmin } = require("../middlewares/authJws");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/auth.controller");
    
    router.post("/login", controller.login)

    app.use('/api/auth', router);

};

