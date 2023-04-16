const express = require("express");
const errorMiddleware = require('./middleware/err')
const cookieParser= require('cookie-parser')
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors());

//Route imports
const book = require('./routes/bookRoute')


app.use("/api/v1", book);




///Middleware For Error
app.use(errorMiddleware);

module.exports = app; 