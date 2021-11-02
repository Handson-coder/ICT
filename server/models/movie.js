'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'Title is required'},
        notNull: { msg: 'Title is required'}
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'Synopsis is required'},
        notNull: { msg: 'Synopsis is required'}
      }
    },
    trailerUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'Trailer URL is required'},
        notNull: { msg: 'Trailer URL is required'}
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'Image is required'},
        notNull: { msg: 'Image is required'}
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'Rating is required'},
        notNull: { msg: 'Rating is required'},
        min: {
          args: 1,
          msg: "Minimum Rating is 1"
        },
        max: {
          args: 10,
          msg: "Maximum Rating is 10"
        },
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'Genre is required'},
        notNull: { msg: 'Genre is required'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'Price is required'},
        notNull: { msg: 'Price is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};