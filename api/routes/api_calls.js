const express = require('express');
var firebase = require("firebase-admin");
const router   = express.Router();

var serviceAccount = require("../../serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://smarthome-karunya-default-rtdb.firebaseio.com"
});


var db = firebase.database();
const refDoor = db.ref('/devices/door/');
const refWindow = db.ref('/devices/window/');
const refHvac = db.ref("/devices/hvac/");
const refLights = db.ref('/devices/lights/');
const refWaterTank = db.ref('/devices/WaterTank/');

router.get('/door',(req,res,next)=>{
    
    refDoor.on('value',(snapshot)=>{
        res.status(200).json({
            status: snapshot.val()
        });
    })
    
    }).post('/door/:value',(req,res,next)=>{
        const status = req.params.value;
        refDoor.set(status, function(error) {
            if (error) {
              // The write failed...
              console.log("Failed with error: " + error)
            } else {
              // The write was successful...
              console.log("success")
            }
        })
        res.status(200).json({
            status: status
        });
        }).get('/window',(req,res,next)=>{
            refWindow.on('value',(snapshot)=>{
                res.status(200).json({
                    status: snapshot.val()
                });
            })
            }).post('/window/:value',(req,res,next)=>{
                const status = req.params.value;
                refWindow.set(status, function(error) {
                    if (error) {
                      // The write failed...
                      res.status(404).json({
                        status: false
                    });
                    } else {
                      // The write was successful...
                      res.status(200).json({
                        status: true
                    });
                    }
                })
            
                }).get('/waterTank',(req,res,next)=>{
                    refWaterTank.on('value',(snapshot)=>{
                        res.status(200).json({
                            status: snapshot.val()
                        });
                    })
                    }).post('/waterTank/:value',(req,res,next)=>{
                        const status = req.params.value;
                        refWaterTank.set(status, function(error) {
                            if (error) {
                              // The write failed...
                              res.status(404).json({
                                status: false
                            });
                            } else {
                              // The write was successful...
                              res.status(200).json({
                                status: true
                            });
                            }
                        })
                        }).get('/HVAC',(req,res,next)=>{
                            refHvac.on('value',(snapshot)=>{
                                res.status(200).json({
                                    status: snapshot.val()
                                });
                            })
                            res.status(200).json({
                                status: true,
                                temprature: 27,
                                atTemp:27,
                                fanspeed:2,
                            });
                            }).post('/HVAC/:value',(req,res,next)=>{
                                const status = req.params.value;
                                refHvac.set(status, function(error) {
                                    if (error) {
                                      // The write failed...
                                      res.status(404).json({
                                        status: false
                                    });
                                    } else {
                                      // The write was successful...
                                      res.status(200).json({
                                        status: true
                                    });
                                    }
                                })

                              
                                }).get('/light/',(req,res,next)=>{
                                    refLights.on('value',(snapshot)=>{
                                        res.status(200).json({
                                            status: snapshot.val()
                                        });
                                    });
                                    }).post('/light/:value',(req,res,next)=>{
                                        const status = req.params.value;
                                        refLights.set(status, function(error) {
                                            if (error) {
                                              // The write failed...
                                              res.status(404).json({
                                                status: false
                                            });
                                            } else {
                                              // The write was successful...
                                              res.status(200).json({
                                                status: true
                                            });
                                            }
                                        });
                                        });
module.exports = router;