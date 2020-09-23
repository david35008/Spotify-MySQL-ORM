'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      youtube_link: {
        type: Sequelize.STRING
      },
      album_id: {
        type: Sequelize.INTEGER
      },
      artist_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.TIME
      },
      track_number: {
        type: Sequelize.INTEGER
      },
      lyrics: {
        type: Sequelize.TEXT
      },
      upload_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Songs');
  }
};