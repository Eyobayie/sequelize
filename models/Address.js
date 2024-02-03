const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');

const Address = sequelize.define('Address', {
  street: DataTypes.STRING,
  country: DataTypes.STRING,
  zipcode: DataTypes.STRING,
},{
  timestamps:false
});

module.exports = Address;