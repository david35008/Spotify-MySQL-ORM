'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "user_albums",
      'is_Liked',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        validate: {
        }
      })

    await queryInterface.addColumn(
      "user_artists",
      'is_Liked',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        validate: {
        }
      })
    await queryInterface.addColumn(
      "user_playlists",
      'is_Liked',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        validate: {
        }
      })
    await queryInterface.addColumn(
      "user_songs",
      'is_Liked',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        validate: {
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_albums', 'isLiked');
    await queryInterface.removeColumn('user_artists', 'isLiked');
    await queryInterface.removeColumn('user_playlists', 'isLiked');
    await queryInterface.removeColumn('user_songs', 'isLiked');
  }
};
