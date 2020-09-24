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
      this.belongsTo(models.Artist, {
        foreignKey: "artistId"
      })
      this.belongsTo(models.User, {
        foreignKey: "email"
      })

    }
  };
  User_artist.init({
    email: DataTypes.STRING,
    artistId: {
      field: "artist_id",
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User_artist',
    paranoid: true
  });
  return User_artist;
};