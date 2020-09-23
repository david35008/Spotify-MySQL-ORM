'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Album,{
        foreignKey:"album_id"
      })
      this.belongsTo(models.User,{
        foreignKey:"email"
      })

    }
  };
  User_album.init({
    email: DataTypes.STRING,
    album_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_album',
  });
  return User_album;
};