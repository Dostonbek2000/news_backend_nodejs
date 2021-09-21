require('dotenv').config();


const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
var corsOptions = { origin: "http://localhost:8081" };
// app.use(cors(corsOptions));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./src/Users/index")
db.sequelize.sync();
const util = require('util');
const helmet = require('helmet');
const appRoot = require('app-root-path');
const { ErrorHandler, handleError } = require('./src/util/error');
const morgan = require('morgan');
const winston = require('./src/util/winston.logger');


// var index =require('./src/Users/index');
// console.log(index,"index");
app.use('/public/img', express.static('public/img'))
app.get("/", (req, res) => {
    res.json({ message: "welcome to appllication of mine" });
});
app.use(morgan('combined', { stream: winston.stream }));

const Router = require('./src/Router')


app.use('/api', Router)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server is working on port number ${PORT}`) });

module.exports = app