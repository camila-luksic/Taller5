module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define("video", {
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_video: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orden_video: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      curso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    return Video;
  };
