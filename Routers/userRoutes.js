const express = require('express');
const router = express.Router();
// import db models
const User = require('../models/User');
const Address = require('../models/Address');
// imports for authentication
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const authenticateToken = require('../Auth/AuthenticationMiddleware');


// user Authentication 

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        console.log("the user is....",user);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
           
        if (!isValidPassword) {
            return  res.status(401).json({ message: "username and password is invalid" });
        }

        const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', JWT_SECRET);
        res.status(500).json({error});
    }
});
// router.get('/users',authenticateToken, async (req,res)=>{
//         try {
//         const users = await User.findAll({
//             include: {
//                 model: Address,
//                 attributes: ['id', 'street', 'country'],
//             },
//             attributes: { exclude: ['AddressId'] }
//         });
//         res.status(200).json(users);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error })
//     }
// });

router.route('/users').get(authenticateToken, async (req,res,)=>{
    try {
        const users = await User.findAll({
            include: {
                model: Address,
                attributes: ['id', 'street', 'country'],
            },
            attributes: { exclude: ['AddressId'] }
        });
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}).post(authenticateToken, async (req, res)=>{
    const data = await req.body; 
     const newUser = User.build({
         //names under quote like name should be the name of column 
         // while addressId Must be the name of User.belongsTo(Address, { foreignKey: 'addressId' });
 
         'username': data.username,
         'password': data.password,
         'phone': data.phone,
         'email': data.email,
         'gender': data.gender,
         'website': data.website,
         'addressId': data.addressId
     });
     try {
         await newUser.save();
         res.status(201).json({ message: "You have registerd the user" });
     } catch (error) {
         console.log(error);
         res.json(error);
     }
})

router.post('/register',authenticateToken, async (req, res) => {
    const data = await req.body;
    const newUser = User.build({
        //names under quote like name should be the name of column 
        // while addressId Must be the name of User.belongsTo(Address, { foreignKey: 'addressId' });

        'username': data.username,
        'password': data.password,
        'phone': data.phone,
        'email': data.email,
        'gender': data.gender,
        'website': data.website,
        'addressId': data.addressId
    });
    try {
        await newUser.save();
        res.status(201).json({ message: "You have registerd the user" });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})
//get a single user by id
router.get('/users/:id',authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            }
        })
        if (!user) {
            res.status(500).json({ message: "user not found!" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
    }
})
// to parcially update the user
router.patch('/users/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            }
        });
        if (!user) {
            res.status(500).json({ message: "User not found" });
        } else {
            const updatedUserData = user.set({
                website: req.body.website
            });
            await updatedUserData.save();
            res.status(200).json(updatedUserData);
        }
    } catch (error) {

    }
})
// full update of a user inf
router.put('/users/:id',authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!user) {
            res.status(500).json({ message: "User not found" });
        } else {
            let userData = req.body;
            updateduser = user.set({
                username: userData.username,
                gender: userData.gender,
                phone: userData.phone,
                website: userData.website,
                email: userData.email,
                addressId: userData.addressId,

            });
            await updateduser.save();
            res.status(200).json({ message: "User data is successfully updated!!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
// to delete a single user by his/her id
router.delete('/users/:id',authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            await user.destroy();
            console.log("user is deleted successfully");
            res.status(200).json({ message: "User deleted successfully!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// get all addressed


module.exports = router;