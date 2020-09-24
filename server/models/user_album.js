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
      this.belongsTo(models.Album, {
        foreignKey: "albumId"
      })
      this.belongsTo(models.User, {
        foreignKey: "email"
      })

    }
  };
  User_album.init({
    email: DataTypes.STRING,
    albumId: {
      field: "album_id",
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User_album',
    paranoid: true
  });
  return User_album;
};