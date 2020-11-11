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
        foreignKey: 'songId'
      });
      this.belongsTo(models.User, {
        foreignKey: 'songId'
      });
    }
  };
  Interaction.init({
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER
    },
    songId: {
      field: "song_id",
      type: DataTypes.INTEGER
    },
    isLiked: {
      field: "is_liked",
      type: DataTypes.BOOLEAN,
    },
    playCount: {
      field: "play_count",
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Interaction',
    paranoid: true
  });
  return Interaction;
};