const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
  const apiCall = require("./api/routes/api_calls")


 
  
//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cors fix
app.use(cors());
//cookie handler
app.use(cookieParser());
const uri = "mongodb+srv://anshil:sachurichusachurichu@cluster0.n9dcg.mongodb.net/?retryWrites=true&w=majority";
//MongoDB call
try {

} catch (error) {
    app.use((req, res, next) => {
        res.status(500).json({
            error: {
                message: "Something went wrong!",
                details: error,
            },
        });
        handleError(error);
    });
}
//routes

app.use("/devices", apiCall);


//error handlers
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error); // forwards the error request
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
