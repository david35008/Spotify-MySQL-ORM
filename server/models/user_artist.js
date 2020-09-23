'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist,{
        foreignKey:"artist_id"
      })
      this.belongsTo(models.User,{
        foreignKey:"email"
      })

    }
  };
  User_artist.init({
    email: DataTypes.STRING,
    artist_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_artist',
  });
  return User_artist;
};