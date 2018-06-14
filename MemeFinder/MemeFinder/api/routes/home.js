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
const getTrendingPath = "/v1/gifs/trending?";
const getSearchPath = "/v1/gifs/search?"
const apiKey = "api_key=YC8Q6IsUVRDc898LRu8UEUhVodqYv6CT";


router.post("/remove", function (req, res) {
  var gif_id = req.body.gif_id;
  connection.query(`DELETE from Favorite WHERE gif_id = '${gif_id}'`, function (error, results, fields) {
    if (error) throw error;
  });
  // console.log(req.body);
  res.redirect("/home/");
});

router.post("/add", function (req, res) {
  var gif_id = req.body.gif_id;
  connection.query(`INSERT INTO Favorite (gif_id, user_id) VALUES ('${gif_id}', 1)`, function (error, results, fields) {
    if (error) throw error;
  });
  // console.log(gif_id);
  res.redirect("/home");
});

router.post("/search", function (req, res) {
  var keywords = req.body.keywords;
  // console.log(req.body);
  res.redirect("/home/" + keywords);
});

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

    // Getting gifs from database (MySQL)
    request(`${host}${getGifsPath}${gifIds}&${apiKey}`, function (error, response, body) {
      if (error) throw error;
      const myGifsJson = JSON.parse(body);

      // Getting trending gifs
      request(`${host}${getTrendingPath}${apiKey}`, function (error, response, body) {
        if (error) throw error;
        const trendingJson = JSON.parse(body);

        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.write(
          `
          <!DOCTYPE html>
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
              <h2>Welcome to Meme Finder!!!</h2>
              <h5>Find your favorite memes. Powered by Giphy</h5>
          
          
            <div class="tab">
              <button class="tablinks" onclick="openCity(event, 'My Memes')">My Memes</button>
              <button class="tablinks" onclick="openCity(event, 'Trending')">Trending</button>
              <button class="tablinks" onclick="openCity(event, 'Search')">Search</button>
            </div>
          
            <div id="My Memes" class="tabcontent">
              <h3>My Memes</h3>
              ${Array(myGifsJson.data.length).join(0).split(0).map((item, i) => `
              <iframe src="${myGifsJson.data[i].embed_url}" width="${(myGifsJson.data[i].images.original.width) * 1.5}" height="${(myGifsJson.data[i].images.original.height) * 1.5}"
                frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
              <form action="/home/remove" method="POST">
                <button name="gif_id" value="${myGifsJson.data[i].id}"> Remove from My Memes</button>
              </form>
              `).join('')}
            </div>
          
            <div id="Trending" class="tabcontent">
              <h3>Trending GIF's!</h3>
              ${Array(trendingJson.data.length).join(0).split(0).map((item, i) => `
              <iframe src="${trendingJson.data[i].embed_url}" width="${(trendingJson.data[i].images.original.width) * 1.5}" height="${(trendingJson.data[i].images.original.height) * 1.5}"
                frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
              <form action="/home/add" method="POST">
                <button name="gif_id" value="${trendingJson.data[i].id}"> Add to My Memes</button>
              </form>
              `).join('')}
          
            </div>
            <script>
          
          
            </script>
            <div id="Search" class="tabcontent">
              <h3>Search GIF's</h3>
          
              <form action="/home/search" method="POST">
                <input type="text" name="keywords" placeholder="Search all Giphy database">
                <button> Submit </button>
              </form>
          
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
          
          </html>
          `
        );
      });
    });
  });
});





router.get("/:keywords", function (req, res) {
  connection.query("SELECT gif_id FROM Favorite", function (error, results, fields) {
    if (error) throw error;
    const myMemes = results;

    let gifIds = "ids=";
    for (i = 0; i < myMemes.length; i++) {
      gifIds += (`${myMemes[i].gif_id},`);
      if (i == myMemes.length - 1) {
        gifIds = gifIds.slice(0, -1);
      }
    }

    // Getting gifs from database (MySQL)
    request(`${host}${getGifsPath}${gifIds}&${apiKey}`, function (error, response, body) {
      if (error) throw error;
      const myGifsJson = JSON.parse(body);

      // Getting trending gifs
      request(`${host}${getTrendingPath}${apiKey}`, function (error, response, body) {
        if (error) throw error;
        const trendingJson = JSON.parse(body);

        // Getting gifs from search input
        let keywords = `q=${req.params.keywords}`;
        request(`${host}${getSearchPath}${keywords}&${apiKey}`, function (error, response, body) {
          if (error) throw error;
          const searchJson = JSON.parse(body);


          res.writeHead(200, {
            "Content-Type": "text/html"
          });
          res.write(
            `
            <!DOCTYPE html>
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
            
              <h2>Welcome to Meme Finder!!!</h2>
              <h5>Find your favorite memes. Powered by Giphy</h5>
              <div class="tab">
                <button class="tablinks" onclick="openCity(event, 'My Memes')">My Memes</button>
                <button class="tablinks" onclick="openCity(event, 'Trending')">Trending</button>
                <button class="tablinks" onclick="openCity(event, 'Search')">Search</button>
              </div>
            
              <div id="My Memes" class="tabcontent">
                <h3>My Memes</h3>
                ${Array(myGifsJson.data.length).join(0).split(0).map((item, i) => `
                <iframe src="${myGifsJson.data[i].embed_url}" width="${(myGifsJson.data[i].images.original.width) * 1.5}" height="${(myGifsJson.data[i].images.original.height) * 1.5}"
                  frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                <form action="/home/remove" method="POST">
                  <button name="gif_id" value="${myGifsJson.data[i].id}"> Remove from My Memes</button>
                </form>
                `).join('')}
              </div>
            
              <div id="Trending" class="tabcontent">
                <h3>Trending GIF's</h3>
                ${Array(trendingJson.data.length).join(0).split(0).map((item, i) => `
                <iframe src="${trendingJson.data[i].embed_url}" width="${(trendingJson.data[i].images.original.width) * 1.5}" height="${(trendingJson.data[i].images.original.height) * 1.5}"
                  frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                <form action="/home/add" method="POST">
                  <button name="gif_id" value="${trendingJson.data[i].id}"> Add to My Memes</button>
                </form>
                <br> `).join('')}
                < </div>
            
            
                  <div id="Search" class="tabcontent">
                    <h3>Search GIF's</h3>
            
                    <form action="/home/search" method="POST">
                      <input type="text" name="keywords" placeholder="Search all Giphy database">
                      <button> Submit </button>
                    </form>
            
                    ${Array(searchJson.data.length).join(0).split(0).map((item, i) => `
                    <iframe src="${searchJson.data[i].embed_url}" width="${(searchJson.data[i].images.original.width) * 1.5}" height="${(searchJson.data[i].images.original.height) * 1.5}"
                      frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    <form action="/home/add" method="POST">
                      <button name="gif_id" value="${searchJson.data[i].id}"> Add to My Memes</button>
                    </form>
                    <br> `).join('')}
            
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
            
            </html>
            `
          );
        });
      });
    });
  });
});



module.exports = router;
