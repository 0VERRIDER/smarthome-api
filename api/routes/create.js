const express = require('express');
const router   = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const Auth = require('../auth/auth');

router.post('/',(req,res,next)=>{
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        user_name: req.body.username,
        email : req.body.email,
        password: req.body.password,
        user_type: req.body.type,        
    });
    user.save().then(result => {
       
        return res.status(201).json({
            message : "Thank you "+user.user_name+". Account registred successfully.",
            result: result
        });
    }).catch( err =>{
        try
        {res.status(409).json({
            message : err.keyPattern['email']>0? "User already exist" : "Invalid entries found",
        
        });
       
}
catch(err){
    res.status(403).json({
            error: "Invalid entries found"
        });
    }
    
    });



})

module.exports = router;