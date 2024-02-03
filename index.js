const express= require('express');
const cors= require('cors');
const userRoutes = require('./Routers/userRoutes');
const addressRoutes=require('./Routers/addressRoutes')
const { sequelize, dbConnection } = require('./db');

const app=express();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api',addressRoutes);
app.use('/api',userRoutes);

const PORT=process.env.PORT || 2000;
app.listen(PORT,async ()=>{
    console.log(`Server is running on port ${PORT}`);
    await dbConnection();
});