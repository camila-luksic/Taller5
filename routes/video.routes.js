module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/video.controller.js");

    router.get('/', controller.listVideo);
    router.get('/:id', controller.getVideoById);
    router.post('/', controller.createVideo);
    router.put('/:id', controller.updateVideoPut);
    router.patch('/:id', controller.updateVideoPatch);
    router.delete('/:id', controller.deleteVideo);
    app.use('/videos', router);

};