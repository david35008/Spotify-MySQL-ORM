'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Song, {
        foreignKey: 'song_id'
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  };
  Interaction.init({
    user_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER,
    is_liked: DataTypes.BOOLEAN,
    play_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interaction',
  });
  return Interaction;
};