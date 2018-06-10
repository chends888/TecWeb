const express = require('express');
let request = require('request');
const router = express.Router();


// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'GET search'
//     });
// });

router.get('/', function(req, res) {
    request('http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YC8Q6IsUVRDc898LRu8UEUhVodqYv6CT', function(error, response, body) {
        var jsonContent = JSON.parse(body);
        console.log(jsonContent);
        // console.log(jsonContent.data[0]);
        // console.log(jsonContent.data[0].embed_url);
        // console.log(jsonContent.data[2].embed_url);
        // console.log(jsonContent.data[1].embed_url);
        // res.json(jsonContent.data[2].embed_url);
    });
});

module.exports = router;