const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const createRoute = require("./api/routes/create");
const createAPIRoute = require("./api/routes/api_create");
const userLogin = require("./api/routes/login")
const apiCall = require("./api/routes/api_calls")

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cors fix
app.use(cors());
//cookie handler
app.use(cookieParser());

//MongoDB call
try {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.set("useCreateIndex", true);
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
app.use("/user/create", createRoute);
app.use("/api/create", createAPIRoute);
app.use("/api/call", apiCall);
app.use("/user/login", userLogin);

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
