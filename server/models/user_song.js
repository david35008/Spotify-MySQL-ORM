'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Song,{
        foreignKey:"song_id"
      })
      this.belongsTo(models.User,{
        foreignKey:"email"
      })

    }
  };
  User_song.init({
    email: DataTypes.STRING,
    song_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_song',
  });
  return User_song;
};