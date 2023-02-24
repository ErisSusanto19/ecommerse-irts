'use strict';
const {
  Model
} = require('sequelize');
const { hashPwd } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Favorite)
    }
  }
  Customer.init({
    username: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Username is required" },
          notNull: { msg: "Username is required" }
        }
    },
    email: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Invalid format email" },
          isUnique(value, next){
            Customer.findAll({
              where: {email: value},
              attributes: ['id']
            })
            .then(user => {
              if(user.length != 0) next(new Error('Email already in use!'))
              next()
            })
            .catch(err => next(err))
          }
        }
    },
    password: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
          len: {
            args: [5],
            msg: "Password is min 5 characters",
          },
        }
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    banned: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.addHook('beforeCreate', customer => {
    customer.password = hashPwd(customer.password)
  })
  return Customer;
};