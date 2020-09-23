'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("user_songs","email",{
      type:Sequelize.STRING,
      allowNull:false
    })
    await queryInterface.changeColumn("user_songs","song_id",{
      type:Sequelize.INTEGER,
      allowNull:false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("user_songs","email",{
      type:Sequelize.STRING,
      allowNull:true
    })
    await queryInterface.changeColumn("user_songs","song_id",{
      type:Sequelize.INTEGER,
      allowNull:true
    })
  }
};