const {Sequelize} =require('sequelize');
const globalOptions = {
    define: {
    //   timestamps: true, 
    //   underscored: true, 
    //   paranoid: true, 
    //   freezeTableName: true, 
      charset: 'utf8mb4', 
      collate: 'utf8mb4_general_ci',
    },
  };
  
const sequelize= new Sequelize(
    'usermanegement',
    'Eyob',
    'inCORRECT@123',
    {
        dialect: 'mysql',
        host: 'localhost',
        define: globalOptions.define,
    }
);

// connect to databse and tables
const dbConnection= async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Successfully connected!!!");
    } catch(error){
        console.log(error);
    }
}
// sync database and tables
sequelize.sync().then(() => {
    console.log('Database and tables synced');
  });

module.exports={
    sequelize,
    dbConnection,
}
