'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "songs",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      }
    );
    await queryInterface.addColumn(
      "albums",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      }
    )
    await queryInterface.addColumn(
      "artists",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      }
    )
    await queryInterface.addColumn(
      "interactions",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      })
    await queryInterface.addColumn(
      "playlists",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      })
    await queryInterface.addColumn(
      "playlists_songs",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      })
    await queryInterface.addColumn(
      "users",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      })
    await queryInterface.addColumn(
      "user_albums",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      })

    await queryInterface.addColumn(
      "user_artists",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      })
    await queryInterface.addColumn(
      "user_playlists",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      })
    await queryInterface.addColumn(
      "user_songs",
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('songs', 'deletedAt');
    await queryInterface.removeColumn('albums', 'deletedAt');
    await queryInterface.removeColumn('artists', 'deletedAt');
    await queryInterface.removeColumn('interactions', 'deletedAt');
    await queryInterface.removeColumn('playlists', 'deletedAt');
    await queryInterface.removeColumn('playlists_songs', 'deletedAt');
    await queryInterface.removeColumn('user_albums', 'deletedAt');
    await queryInterface.removeColumn('user_artists', 'deletedAt');
    await queryInterface.removeColumn('user_playlists', 'deletedAt');
    await queryInterface.removeColumn('user_songs', 'deletedAt');
    await queryInterface.removeColumn('user_users', 'deletedAt');
  }
};