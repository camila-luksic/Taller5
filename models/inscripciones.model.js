module.exports = (sequelize, Sequelize) => {
    const Inscripcion= sequelize.define("inscripcion", {

        curso_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        estudiante_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    });
    return Inscripcion;
}