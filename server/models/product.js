'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Favorite)
    }
  }
  Product.init({
    code: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Code is required" },
          notNull: { msg: "Code is required" }
        }
    },
    name: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product name is required" },
          notNull: { msg: "Product name is required" }
        }
    },
    price: {
      type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product price is required" },
          notNull: { msg: "Product price is required" }
        }
    },
    brand: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image URL is required" },
          notNull: { msg: "Image URL is required" }
        }
    },
    info: DataTypes.STRING,
    pdp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};