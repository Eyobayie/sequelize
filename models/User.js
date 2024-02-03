const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');
const Address = require('./Address');
const bcrypt = require('bcrypt');

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender:{
    type: DataTypes.STRING,
    allowNull:true,
    validator:{
        max:15
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website:{
    type:DataTypes.STRING,
    allowNull:true
  }
},
{
  hooks: {
    beforeCreate: async (user) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    },
  },
  timestamps: false,
});

User.belongsTo(Address, { foreignKey: 'addressId' });

module.exports = User;