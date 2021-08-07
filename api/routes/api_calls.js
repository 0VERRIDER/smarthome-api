const express = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const API = require('../models/api');
const axios = require("axios");


router.get('/',(req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const add_url = (req.body.param == undefined ) ? "": req.body.param
    const name = req.body.name
    const content = req.body.content
    
        API.findOne({ registred_email: email, api_name: name }, (err, api) => {
            try
            {
        if(err) throw err
        if(!api) throw "User not found"
        api.comparePassword(password, function(err, isMatch){
            if(err) throw "Authentication error"
            if(isMatch)
            {
                axios({
                    method: 'get',
                    url: api.api_url + add_url,
                    data: content
                  }).then(response =>{
                    res.status(200).json({
                        response : response.data
                      })
                  }).catch(err =>{
                    res.status(400).json({
                        error : err.message
                    })
                  });
               
            }
            else{
                res.status(403).json({
                    err :"Authentication Error"
                  })
            }
        });
    }
    catch(err){
        res.status(400).json({
          err : err
        })
    }
    })
    
    
    });
    
// POST REQUEST HANDLE
router.post('/',(req,res,next)=>{
const email = req.body.email
const password = req.body.password
const add_url = (req.body.param == undefined ) ? "": req.body.param
const name = req.body.name
const content = req.body.content

    API.findOne({ registred_email: email, api_name: name }, (err, api) => {
        try
        {
    if(err) throw err
    if(!api) throw "User not found"
    api.comparePassword(password, function(err, isMatch){
        if(err) throw "Authentication error"
        if(isMatch)
        {
            axios({
                method: 'post',
                url: api.api_url + add_url,
                data: content
              }).then(response =>{
                res.status(200).json({
                    Messsage : "Uploaded"
                  })
              }).catch(err =>{
                res.status(400).json({
                    error : err.message
                })
              });
           
        }
        else{
            res.status(403).json({
                err :"Authentication Error"
              })
        }
    });
}
catch(err){
    res.status(400).json({
      err : err
    })
}
})


});

//PUT REQUEST HANDLE
router.put('/',(req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const add_url = (req.body.param == undefined ) ? "": req.body.param
    const name = req.body.name
    const content = req.body.content
    
        API.findOne({ registred_email: email, api_name: name }, (err, api) => {
            try
            {
        if(err) throw err
        if(!api) throw "User not found"
        api.comparePassword(password, function(err, isMatch){
            if(err) throw "Authentication error"
            if(isMatch)
            {
                axios({
                    method: 'put',
                    url: api.api_url + add_url,
                    data: content
                  }).then(response =>{
                    res.status(200).json({
                        Messsage : "Uploaded"
                      })
                  }).catch(err =>{
                    res.status(400).json({
                        error : err.message
                      })
                  });
               
            }
            else{
                res.status(403).json({
                    err :"Authentication Error"
                  })
            }
        });
    }
    catch(err){
        res.status(400).json({
          err : err
        })
    }
    })
    
    
    });

    //DELETE REQUEST HANDLE
    router.delete('/',(req,res,next)=>{
        const email = req.body.email
        const password = req.body.password
        const add_url = (req.body.param == undefined ) ? "": req.body.param
        const name = req.body.name
        const content = req.body.content
        
            API.findOne({ registred_email: email, api_name: name }, (err, api) => {
                try
                {
            if(err) throw err
            if(!api) throw "User not found"
            api.comparePassword(password, function(err, isMatch){
                if(err) throw "Authentication error"
                if(isMatch)
                {
                    axios({
                        method: 'delete',
                        url: api.api_url + add_url,
                        data: content
                      }).then(response =>{
                        res.status(200).json({
                            Messsage : "DELETED"
                          })
                      }).catch(err =>{
                        res.status(400).json({
                            error : err.message
                        })
                      });
                   
                }
                else{
                    res.status(403).json({
                        err :"Authentication Error"
                      })
                }
            });
        }
        catch(err){
            res.status(400).json({
              err : err
            })
        }
        })
        
        
        });
        router.patch('/',(req,res,next)=>{
            const email = req.body.email
            const password = req.body.password
            const add_url = req.body.param
            const name = req.body.name
            const content = req.body.content
            
                API.findOne({ registred_email: email, api_name: name }, (err, api) => {
                    try
                    {
                if(err) throw err
                if(!api) throw "User not found"
                api.comparePassword(password, function(err, isMatch){
                    if(err) throw "Authentication error"
                    if(isMatch)
                    {
                        axios({
                            method: 'patch',
                            url: api.api_url + add_url,
                            data: content
                          }).then(response =>{
                            res.status(200).json({
                                Messsage : "Patched"
                              })
                          }).catch(err =>{
                            res.status(400).json({
                                error : err.message
                            })
                          });
                       
                    }
                    else{
                        res.status(403).json({
                            err :"Authentication Error"
                          })
                    }
                });
            }
            catch(err){
                res.status(400).json({
                  err : err
                })
            }
            })
            
            
            });
module.exports = router;