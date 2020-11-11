'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn("interactions","user_id",{
      type:Sequelize.INTEGER,
      allowNull:false
    })
    await queryInterface.changeColumn("interactions","song_id",{
      type:Sequelize.INTEGER,
      allowNull:false
    })
    await queryInterface.changeColumn("interactions","is_liked",{
      type:Sequelize.BOOLEAN,
      defaultValue:0
    })
    await queryInterface.changeColumn("interactions","play_count",{
      type:Sequelize.INTEGER,
      defaultValue:0
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("interactions","user_id",{
      type:Sequelize.INTEGER,
      allowNull:true
    })
    await queryInterface.changeColumn("interactions","song_id",{
      type:Sequelize.INTEGER,
      allowNull:true
    })
    await queryInterface.changeColumn("interactions","is_liked",{
      type:Sequelize.BOOLEAN,
    })
    await queryInterface.changeColumn("interactions","play_count",{
      type:Sequelize.INTEGER,
    })
  }
};