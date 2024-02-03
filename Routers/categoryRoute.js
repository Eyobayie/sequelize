const express= require('express');
const Category = require('../models/Category');
const router= express.Router();

router.route('/categories').get( async (req, res)=>{
    try {
        const categorites= Category.findAll();
        if(!categorites){
            return res.status(200).json({message:"Category is not available"});
        } 
        res.status(200).json(categorites);
    } catch (error) {
        console.log("ERROR FROM CATCH IS...",Error);
        res.status(500).json({message:"Internal server error"})
    }
}).post( async (req,res)=>{
    
})