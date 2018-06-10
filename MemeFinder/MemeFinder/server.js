const http = require('http');
let request = require('request');
let app = require('./app');

const server = http.createServer(app);
const port = 3300;


// http://api.giphy.com/v1/gifs/xT4uQulxzV39haRFjG?&api_key=YC8Q6IsUVRDc898LRu8UEUhVodqYv6CT
// https://malcoded.com/posts/angular-backend-express
// https://appdividend.com/2018/01/21/angular-5-crud-tutorial-example-scratch/


console.log('Running on port:', port);
server.listen(port);
