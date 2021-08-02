const express = require("express")
const app = express()
//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());



module.exports = app