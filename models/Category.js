const {DataTypes}= require('sequelize');
const { sequelize }= require('../db');
const Category= sequelize.define('Category',{
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type: DataTypes.STRING,
        validate:{
            max:1000,
        }
    }
},{
   timestamps:false,
})
module.exports=Category;