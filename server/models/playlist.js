'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Playlists_Song, {
        foreignKey: 'playlist_id',
      })
      this.hasMany(models.User_playlist, {
        foreignKey: 'playlist_id',
      })

    }
  };
  Playlist.init({
    name: DataTypes.STRING,
    uploaded_at: DataTypes.DATE,
    cover_img: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};