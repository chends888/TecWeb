const http = require('http');
let request = require('request');
let app = require('./app');

const server = http.createServer(app);
const port = 3000;


// app.get('/', function (req, res) {
//     connection.query('SELECT * FROM Favorite WHERE user_id = 2', function (error, results, fields) {
//         if (error) throw error;
//         res.json(results)
//     });
// });

// http://api.giphy.com/v1/gifs/xT4uQulxzV39haRFjG?&api_key=YC8Q6IsUVRDc898LRu8UEUhVodqYv6CT
// https://malcoded.com/posts/angular-backend-express

// app.get('/getgif', function(req, res) {
//     request('http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YC8Q6IsUVRDc898LRu8UEUhVodqYv6CT&limit=1', function(error, response, body) {
//         var jsonContent = JSON.parse(body);
//         console.log(jsonContent);
//         console.log(jsonContent.data[0]);
//         console.log(jsonContent.data[0].embed_url);
//         res.json(jsonContent.data[0].embed_url)
//     });
// });

console.log('Running on port:', port);
server.listen(port);