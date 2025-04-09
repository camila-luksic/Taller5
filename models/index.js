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

db.cursos=require("./cursos.model.js")(sequelize,Sequelize);
db.categorias=require("./categoria.model.js")(sequelize,Sequelize);
db.videos=require("./video.model.js")(sequelize,Sequelize);

db.cursos.belongsTo(db.categorias, { as: 'categoria_curso', foreignKey: 'categoria_id' });
db.categorias.hasMany(db.cursos, {
    foreignKey: 'categoria_id', // Clave foránea en el modelo Curso
  });
//Editar una vez se tenga usuario
//db.cursos.belongsTo(db.usuario, { as: 'profesor_curso', foreignKey: 'profesor_id' });
db.videos.belongsTo(db.cursos, { as: 'curso_video', foreignKey: 'curso_id' });
db.cursos.hasMany(db.videos, {
    foreignKey: 'curso_id', // Clave foránea en el modelo Curso
  });



module.exports = db;
