const express = require("express")
const app = express()
//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//error handlers
app.use((req,res,next) =>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error); // forwards the error request
});


app.use((error,req,res,next) =>{
    res.status(error.status || 500 );
    res.json({
        error:{
            message : error.message
        }
    });
});

module.exports = app