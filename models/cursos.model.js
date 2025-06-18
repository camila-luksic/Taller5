module.exports = (sequelize, Sequelize) => {
    const Curso = sequelize.define("curso", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        categoria_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        profesor_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    });
    return Curso;
}