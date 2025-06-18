module.exports = (sequelize, Sequelize) => {
    const Nota= sequelize.define("nota", {

        curso_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        estudiante_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        primer_parcial:{
            type:Sequelize.FLOAT,
            allowNull:true
        },
        segundo_parcial:{
            type:Sequelize.FLOAT,
            allowNull:true
        },
        examen_final:{
            type:Sequelize.FLOAT,
            allowNull:true
        }

    });
    return Nota;
}