module.exports=app=>{

    require("./categoria.routes.js")(app);
    require("./cursos.routes.js")(app);
    require("./video.routes.js")(app);

    require("./auth.routes.js")(app);
    require("./rol.routes.js")(app);
    require("./usuario.routes")(app);
    
    require("./nota.routes.js")(app);
    require("./inscripciones.routes.js")(app);
    require("./comentario.routes.js")(app);

    require("./certificados.routes.js")(app);
    require("./progreso.routes.js")(app);    

}