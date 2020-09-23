'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.user_album)
      this.hasMany(models.user_playlist)
      this.hasMany(models.user_artist)
      this.hasMany(models.user_song)
      this.hasMany(models.interactions)

    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    prefrences: DataTypes.JSON,
    remember_token: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};