'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Song)
      this.hasMany(models.Album)
      this.hasMany(models.models.User_artist)


    }
  };
  Artist.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    uploaded_at: DataTypes.DATE,
    cover_img: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};