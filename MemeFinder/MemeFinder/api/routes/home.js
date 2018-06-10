const express = require('express');
const request = require('request');
const mysql = require('mysql');

const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "chends",
  password: "8888",
  database: "memefinder"
});

// API variables
const host = "http://api.giphy.com";
const getGifsPath = "/v1/gifs?";
const getTrendingpath = "/v1/gifs/trending?";
const apiKey = "api_key=YC8Q6IsUVRDc898LRu8UEUhVodqYv6CT";

// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'GET gif'
//     });
// });

// router.get('/', function (req, res) {
//   connection.query('SELECT * FROM Favorite WHERE user_id = 2', function (error, results, fields) {
//     if (error) throw error;
//     const myMemes = results;
//     console.log(myMemes);
//     // res.json(results)
//   });
// });

router.get("/", function (req, res) {
  connection.query("SELECT gif_id FROM Favorite", function (error, results, fields) {
    if (error) throw error;
    const myMemes = results;
    // console.log(myMemes[0].gif_id);
    // res.json(results)
    // console.log(myMemes.length);

    let gifIds = "ids=";
    for (i = 0; i < myMemes.length; i++) {
      gifIds += (`${myMemes[i].gif_id},`);
      if (i == myMemes.length - 1) {
        gifIds = gifIds.slice(0, -1);
      }
    }

    // console.log(gifIds);
    // console.log(`${host}${getGifsPath}${gifIds}${apiKey}`);


    request(`${host}${getGifsPath}${gifIds}&${apiKey}`, function (error, response, body) {
      if (error) throw error;
      const myGifsJson = JSON.parse(body);
      request(`${host}${getTrendingpath}${apiKey}`, function (error, response, body) {
        if (error) throw error;
        const trendingJson = JSON.parse(body);

        // console.log(myGifsJson.data.length);

        // console.log(myGifsJson);
        // console.log(myGifsJson.data[0]);
        // console.log(myGifsJson.data[0].embed_url);
        // console.log(myGifsJson.data[2].embed_url);
        // console.log(myGifsJson.data[1].embed_url);
        // res.json(myGifsJson);
        // console.log(body);

        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.write(
          `<!DOCTYPE html>
        <html>
        
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: Arial;
            }
        
            /* Style the tab */
        
            .tab {
              overflow: hidden;
              border: 1px solid #ccc;
              background-color: #f1f1f1;
            }
        
            /* Style the buttons inside the tab */
        
            .tab button {
              background-color: inherit;
              float: left;
              border: none;
              outline: none;
              cursor: pointer;
              padding: 14px 16px;
              transition: 0.3s;
              font-size: 17px;
            }
        
            /* Change background color of buttons on hover */
        
            .tab button:hover {
              background-color: #ddd;
            }
        
            /* Create an active/current tablink class */
        
            .tab button.active {
              background-color: #ccc;
            }
        
            /* Style the tab content */
        
            .tabcontent {
              display: none;
              padding: 6px 12px;
              border: 1px solid #ccc;
              border-top: none;
            }
        
          </style>
        
          <title>Meme Finder</title>
        
        </head>
        
        <body>
        
          <p>Click on the buttons inside the tabbed menu:</p>
        
          <div class="tab">
            <button class="tablinks" onclick="openCity(event, 'My Memes')">My Memes</button>
            <button class="tablinks" onclick="openCity(event, 'Trending')">Trending</button>
            <button class="tablinks" onclick="openCity(event, 'Search')">Search</button>
          </div>
        
          <div id="My Memes" class="tabcontent">
            <h3>My Memes</h3>
            <p>My Memes is the capital city of England.</p>
              ${Array(myGifsJson.data.length).join(0).split(0).map((item, i) => `
              <iframe src="${myGifsJson.data[i].embed_url}" width="${(myGifsJson.data[i].images.original.width) * 1.5}" height="${(myGifsJson.data[i].images.original.height) * 1.5}" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
              `).join('')}
          </div>
        
          <div id="Trending" class="tabcontent">
            <h3>Trending</h3>
            <p>Trending is the capital of France.</p>
              ${Array(trendingJson.data.length).join(0).split(0).map((item, i) => `
              <iframe src="${trendingJson.data[i].embed_url}" width="${(trendingJson.data[i].images.original.width) * 1.5}" height="${(trendingJson.data[i].images.original.height) * 1.5}" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
              `).join('')}
          </div>
        
          <div id="Search" class="tabcontent">
            <h3>Search</h3>
            <p>Search is the capital of Japan.</p>
          </div>
        
          <script>
            function openCity(evt, cityName) {
              var i, tabcontent, tablinks;
              tabcontent = document.getElementsByClassName("tabcontent");
              for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
              }
              tablinks = document.getElementsByClassName("tablinks");
              for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
              }
              document.getElementById(cityName).style.display = "block";
              evt.currentTarget.className += " active";
            }
        
          </script>
        </body>
        
        </html>`
        );
      });
    });
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "POST gif"
  });
});

module.exports = router;
