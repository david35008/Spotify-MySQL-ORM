'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("user_artists","email",{
      type:Sequelize.STRING,
      allowNull:false
    })
    await queryInterface.changeColumn("user_artists","artist_id",{
      type:Sequelize.INTEGER,
      allowNull:false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("user_artists","email",{
      type:Sequelize.STRING,
      allowNull:true
    })
    await queryInterface.changeColumn("user_artists","artist_id",{
      type:Sequelize.INTEGER,
      allowNull:true
    })
  }
};