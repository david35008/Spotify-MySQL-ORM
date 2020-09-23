'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Playlists_song);
      this.hasMany(models.Interaction);
      this.hasMany(models.user_song);
      this.belongsTo(models.Artist, {
        foreignKey: 'artist_id'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'album_id'
      });

    }
  };
  Song.init({
    youtube_link: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    artist_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    length: DataTypes.TIME,
    track_number: DataTypes.INTEGER,
    lyrics: DataTypes.TEXT,
    upload_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};