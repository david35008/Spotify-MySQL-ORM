'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users","name",{
      type:Sequelize.STRING,
      allowNull:false
    })
    await queryInterface.changeColumn("users","email",{
      type:Sequelize.STRING,
      allowNull:false,
      unique: true,
    })
    await queryInterface.changeColumn("users","is_admin",{
      type:Sequelize.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.changeColumn("users","password",{
      type:Sequelize.STRING,
      allowNull:false,
      min:{
        args:6,
        msg:"Minimum 6 characters required in password"
    }
    })
    await queryInterface.changeColumn("users","remember_token",{
      type:Sequelize.BOOLEAN,
      defaultValue: false
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users","name",{
      type:Sequelize.STRING,
      allowNull:true
    })
    await queryInterface.changeColumn("users","email",{
      type:Sequelize.STRING,
      allowNull:true,
      unique: false,
    })
    await queryInterface.changeColumn("users","is_admin",{
      type:Sequelize.BOOLEAN,
    })
    await queryInterface.changeColumn("users","password",{
      type:Sequelize.STRING,
      allowNull:true,

    })
    await queryInterface.changeColumn("users","remember_token",{
      type:Sequelize.BOOLEAN,
    })
  }
};