const express = require('express');
const app = express();
// var mysql = require('mysql');



// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'chends',
//     password: '8888',
//     database: 'memefinder'
// });


const trending = require('./api/routes/trending');
const getgif = require('./api/routes/getgif');
const search = require('./api/routes/search');


app.use('/trending', trending);
app.use('/getgif', getgif);
app.use('/search', search);

module.exports = app;