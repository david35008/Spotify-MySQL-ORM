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
      this.belongsTo(models.Playlist, {
        foreignKey: "playlistId"
      })
      this.belongsTo(models.User, {
        foreignKey: "email"
      })

    }
  };
  User_playlist.init({
    email: DataTypes.STRING,
    playlistId: {
      field: "playlist_id",
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User_playlist',
    paranoid: true
  });
  return User_playlist;
};