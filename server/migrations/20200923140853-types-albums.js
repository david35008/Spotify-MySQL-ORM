'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("albums","artist_id",{
      type:Sequelize.INTEGER,
      allowNull:false
    })
    await queryInterface.changeColumn("albums","name",{
      type:Sequelize.STRING,
      allowNull:false
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("albums","artist_id",{
      type:Sequelize.INTEGER,
      allowNull:true
    })
    await queryInterface.changeColumn("albums","name",{
      type:Sequelize.STRING,
      allowNull:true
    })
  }
};