const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  
const jwt = require('jsonwebtoken');
const router = express.Router();

//Register Route
router.post('/register', async (req,res)=>{
    const {firstName, lastName, email, password, phone} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const newUser = new User({firstName, lastName, email, password, phone});

        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});


//Login Route
router.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    // validatinmg input
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});

        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
    
        }
        const token = jwt.sign(
            {userId: user._id, firstName: user.firstName, lastName: user.lastName},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(200).json({
            token,
            user: {
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone
            },
          });
    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
