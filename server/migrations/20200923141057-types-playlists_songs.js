'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("playlists_songs","playlist_id",{
      type:Sequelize.INTEGER,
      allowNull:false
    })
    await queryInterface.changeColumn("playlists_songs","song_id",{
      type:Sequelize.INTEGER,
      allowNull:false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("playlists_songs","playlist_id",{
      type:Sequelize.INTEGER,
      allowNull:true
    })
    await queryInterface.changeColumn("playlists_songs","song_id",{
      type:Sequelize.INTEGER,
      allowNull:true
    })
  }
};