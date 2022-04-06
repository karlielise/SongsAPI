const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const songs = [];

const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("<div style='min-height:100vh; display:flex; align-items:center; justify-content:center;'><h1>This is a Song API</h1></div>");
});

app.get("/songs", (req, res) => {
  axios
    .get("https://www.citimuzik.com/")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $(".entry-title", html).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");
        songs.push({
          title,
          url,
        });
      });
      res.json(songs);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Port ${PORT} is now live`));
