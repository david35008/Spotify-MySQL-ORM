'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("songs", "album_id", {
      type: Sequelize.INTEGER,
      allowNull: false
    })
    await queryInterface.changeColumn("songs", "artist_id", {
      type: Sequelize.INTEGER,
      allowNull: false
    })
    await queryInterface.changeColumn("songs", "name", {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("songs", "album_id", {
      type: Sequelize.INTEGER,
      allowNull: true
    })
    await queryInterface.changeColumn("songs", "artist_id", {
      type: Sequelize.INTEGER,
      allowNull: true
    })
    await queryInterface.changeColumn("songs", "name", {
      type: Sequelize.STRING,
      allowNull: true
    })
  }
};