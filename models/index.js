const dbConfig=require("../config/db.config.js");
const Sequelize=require("sequelize");
const sequelize=new Sequelize(
    dbConfig.Db,
    dbConfig.User,
    dbConfig.Password,
    {
        host:dbConfig.Host,
        port:dbConfig.Port,
        dialect:"postgres",
    }
);

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;


db.roles = require('./rol.model.js')(sequelize, Sequelize);
db.usuarios = require('./usuario.model.js')(sequelize, Sequelize);

db.categorias=require("./categoria.model.js")(sequelize,Sequelize);
db.cursos=require("./cursos.model.js")(sequelize,Sequelize);
db.videos=require("./video.model.js")(sequelize,Sequelize);

db.inscripciones=require("./inscripciones.model.js")(sequelize,Sequelize);
db.notas=require("./notas.model.js")(sequelize,Sequelize);
db.comentarios=require("./comentarios.model.js")(sequelize,Sequelize);

db.certificados=require("./certificados.model.js")(sequelize,Sequelize);

db.progreso=require("./progreso.model.js")(sequelize,Sequelize);





//Un usuario puede tener un rol
//Un rol puede tener muchos usuarios
db.roles.hasMany(db.usuarios, {
    foreignKey: 'rolId',
});
db.usuarios.belongsTo(db.roles, {
    foreignKey: 'rolId',
    as: 'rol',
});



db.cursos.belongsTo(db.categorias, { as: 'categoria_curso', foreignKey: 'categoria_id' });
db.categorias.hasMany(db.cursos, {
    foreignKey: 'categoria_id', 
  });
//Editar una vez se tenga usuario
db.cursos.belongsTo(db.usuarios, { as: 'profesor_curso', foreignKey: 'profesor_id' });
db.videos.belongsTo(db.cursos, { as: 'curso_video', foreignKey: 'curso_id' });
db.cursos.hasMany(db.videos, {
    foreignKey: 'curso_id',
  });

db.inscripciones.belongsTo(db.usuarios,{as :'inscripcion_estudiante',foreignKey: 'estudiante_id' });
db.usuarios.hasMany(db.inscripciones,{
    foreignKey:'estudiante_id'
});

db.inscripciones.belongsTo(db.cursos,{as: 'inscripcion_curso',foreignKey:'curso_id'});
db.cursos.hasMany(db.inscripciones,{
    foreignKey:'curso_id'
});


db.notas.belongsTo(db.usuarios,{as :'nota_estudiante',foreignKey: 'estudiante_id' });
db.usuarios.hasMany(db.notas,{
    foreignKey:'estudiante_id'
});

db.notas.belongsTo(db.cursos,{as: 'nota_curso',foreignKey:'curso_id'});
db.cursos.hasMany(db.notas,{
    foreignKey:'curso_id'
});



db.comentarios.belongsTo(db.usuarios,{as :'comentario_estudiante',foreignKey: 'estudiante_id' });
db.usuarios.hasMany(db.comentarios,{
    foreignKey:'estudiante_id'
});

db.comentarios.belongsTo(db.cursos,{as: 'comentario_curso',foreignKey:'curso_id'});
db.cursos.hasMany(db.comentarios,{
    foreignKey:'curso_id'
});

db.certificados.belongsTo(db.cursos,{as: 'certificado_curso',foreignKey:'curso_id'});
db.cursos.hasMany(db.certificados,{
    foreignKey:'curso_id'
});

db.certificados.belongsTo(db.usuarios,{as :'certificado_estudiante',foreignKey: 'estudiante_id' });
db.usuarios.hasMany(db.certificados,{
    foreignKey:'estudiante_id'
});


db.progreso.belongsTo(db.usuarios,{as :'progreso_estudiante',foreignKey: 'estudiante_id' });
db.usuarios.hasMany(db.progreso,{
    foreignKey:'estudiante_id'
});

db.progreso.belongsTo(db.cursos,{as: 'progreso_curso',foreignKey:'curso_id'});
db.cursos.hasMany(db.progreso,{
    foreignKey:'curso_id'
});




module.exports = db;
