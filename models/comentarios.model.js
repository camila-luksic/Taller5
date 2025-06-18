module.exports = (sequelize, Sequelize) => {
    const Comentarios= sequelize.define("comentarios", {
        curso_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        estudiante_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comentario:{
            type:Sequelize.STRING,
            allowNull:false
        },
        fecha:{
            type:Sequelize.DATE,
            allowNull:false
        }

    });
    return Comentarios;
}