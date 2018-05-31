var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'chends',
    password: '8888',
    database: 'memefinder'
});

app.get('/', function (req, res) {
    connection.query('SELECT * FROM Favorite WHERE user_id = 2', function (error, results, fields) {
        if (error) throw error;
        res.json(results)
    });
});

var api = "http://api.giphy.com/v1/gifs/"
var gifId = "xT4uQulxzV39haRFjG?"
var apiKey = "&api_key=YC8Q6IsUVRDc898LRu8UEUhVodqYv6CT"

function setup() {
    noCanvas();
    var url = api + gifId + apiKey;
    loadJSON(url, gotData);
}


function gotData(data) {
    println(data);
}

// https://malcoded.com/posts/angular-backend-express
// app.route('/trending').get((req, res) => {});


app.listen(3300, function () {
    console.log('Server running on port 3200')
});