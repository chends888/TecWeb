var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'chends',
    password: '8888',
    database: 'memefinder'
});

app.get('/', function(req, res){
    connection.query('SELECT * FROM Favorite WHERE user_id = 2', function(error, results, fields) {
        if(error) throw error;
        res.json(results)
    });
});

app.listen(3200, function() {
    console.log('Server running on port 3200')
});