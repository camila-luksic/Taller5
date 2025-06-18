module.exports = (sequelize, Sequelize) => {
    const Progreso= sequelize.define("progreso", {
        curso_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        estudiante_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        porcentaje:{
            type:Sequelize.FLOAT,
            allowNull:false
        }

    });
    return Progreso;
}