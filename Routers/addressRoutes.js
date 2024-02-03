const express= require('express');
const Address = require('../models/Address');
const router= express.Router();

router.route('/addresses').get( async (req, res)=>{
    try {
        const addresses = await Address.findAll({
            attributes: ['id', 'country', 'zipcode', 'street'],
        });

        if (addresses.length > 0) {
            res.status(200).json(addresses);
        } else {
            res.status(404).json({ message: "Addresses not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Address fetching error", error });
    }
}).post( async (req, res)=>{
    const data= req.body;
    try {
        const newAddress= await Address.build({
            'street': data.street,
            'country': data.country,
            'zipcode': data.zipcode
        });
        newAddress.save();
        res.status(200).json({message:"Address is added"});
    } catch (error) {
        console.log("ADDRESS CATCH ERROR IS....", error);
        res.status(500).json(error);
    }
})
module.exports=router;
