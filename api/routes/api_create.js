const express = require('express');
const router   = express.Router();
const API = require('../models/api');
const mongoose = require('mongoose');

router.post('/',(req,res,next)=>{
    const api = new API({
        _id: mongoose.Types.ObjectId(),
        api_name: req.body.api_name,
        registred_email : req.body.email,
        password: req.body.password,
        api_url : req.body.url,
        api_key : req.body.api_key,
        req_type: req.body.type 
    });
   api.save().then(result => {
       
        return res.status(201).json({
            message : "Thank you API registred successfully.",
            result: result
        });
    }).catch( err =>{
        
        try
        {res.status(409).json({
            message : err.keyPattern['api_name']>0 && err.keyPattern['registred_email']>0? "API already exist" : "Invalid entries found",
        
        });
       
}
catch(err){
    res.status(403).json({
            error: err
        });
    }
    
    });

})

module.exports = router;