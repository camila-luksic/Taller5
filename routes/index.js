module.exports=app=>{

    require("./categoria.routes.js")(app);
    require("./cursos.routes.js")(app);
    require("./video.routes.js")(app);
}