module.exports = (sequelize, Sequelize) => {
    const Certifacados= sequelize.define("certificados", {
        curso_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        estudiante_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        url:{
            type:Sequelize.STRING,
            allowNull:false
        }

    });
    return Certifacados;
}