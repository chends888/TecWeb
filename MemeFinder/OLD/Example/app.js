const express = require('express');
const app = express();
var mysql = require('mysql');

const trending = require('./api/routes/trending');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'chends',
    password: '8888',
    database: 'memefinder'
});


app.use('/trending', trending);

module.exports = app;