'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.Movie, { foreignKey: 'MovieId' })
      Favourite.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  };
  Favourite.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'UserId is required'},
        notNull: { msg: 'UserId is required'}
      }
    },
    MovieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'MovieId is required'},
        notNull: { msg: 'MovieId is required'}
      }
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'is Paid is required'},
        notNull: { msg: 'is Paid is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'Favourite',
    hooks: {
      beforeCreate: (favourite, options) => {
        favourite.is_paid = false
      }
    }
  });
  return Favourite;
};