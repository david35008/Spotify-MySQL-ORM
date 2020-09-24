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
      this.hasMany(models.PlaylistsSong, {
        foreignKey: "songId"
      });
      this.hasMany(models.Interaction, {
        foreignKey: 'songId'
      });
      this.hasMany(models.User_song, {
        foreignKey: 'songId'
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'albumId'
      });

    }
  };
  Song.init({
    youtubeLink: {
      field: "youtube_link",
      type: DataTypes.STRING
    },
    albumId: {
      field: "album_id",
      type: DataTypes.INTEGER
    },
    artistId: {
      field: "artist_id",
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    length: DataTypes.TIME,
    trackNumber: {
      field: "track_number",
      type: DataTypes.INTEGER
    },
    lyrics: DataTypes.TEXT,
    uploadAt: {
      field: "upload_at",
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Song',
    paranoid: true
  });
  return Song;
};