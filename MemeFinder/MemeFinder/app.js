const express = require('express');
const app = express();
var bodyParser = require('body-parser')

// var mysql = require('mysql');



// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'chends',
//     password: '8888',
//     database: 'memefinder'
// });


// const trending = require('./api/routes/trending');
const home = require('./api/routes/home');
// const search = require('./api/routes/search');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use('/trending', trending);
app.use('/home', home);
// app.use('/search', search);

module.exports = app;