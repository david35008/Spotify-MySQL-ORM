'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Playlist,{
        foreignKey:"playlist_id"
      })
      this.belongsTo(models.User,{
        foreignKey:"email"
      })

    }
  };
  User_playlist.init({
    email: DataTypes.STRING,
    playlist_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_playlist',
  });
  return User_playlist;
};