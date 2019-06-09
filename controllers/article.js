const axios = require("axios");
const cheerio = require("cheerio");
// const mongoose = require("mongoose");
// const db = require('../models');

exports.scrapeArticles = async function(req, res) {
    try {
      const pageNum = req.params.pageNum || 1;

      const url = 'https://newsapi.org/v2/everything?' +
          'q=("national park" OR "national parks" OR "state park" OR "state parks") AND (protect OR protected) NOT (kill OR killed OR visit OR "North Face" OR "things to do" OR "ranks best")&' +
          `page=${pageNum}&` +
          'apiKey=6e75f816d0b6424e9bff62fee9c8c460';
      const response = await axios.get(url);

      // console.log(response);
      // console.log();
      // console.log(response.data);

      // let $ = cheerio.load(response.data);

      // console.log();
      // console.log($);
      // body > div > div > main > div > 
      // let element = $(`#solrstrap-hits > div > div.entry`);

      // console.log(element);
      // console.log();
      // console.log(element.length);
  
      // for(let i=1; i <= element.length; i++) {
      //   let href = $(`body > div > div > main > div.components-wrapper > div > div > div.library-landing-wrapper-items > a:nth-child(${i})`).attr('href');
      //   let title = $(`body > div > div > main > div.components-wrapper > div > div > div.library-landing-wrapper-items > a:nth-child(${i}) > div > h3`).text();
      //   let summary = $(`body > div > div > main > div.components-wrapper > div > div > div.library-landing-wrapper-items > a:nth-child(${i}) > div > div.wide-teaser-summary > p`).text();
      //   let article = new db.Article({
      //     title: title,
      //     summary: summary,
      //     href: href
      //   });
      //   await article.save();
      // }
      // res.json( { message: "Articles successfully scraped", article });
      // res.json( { message: "scrape article route has been hit" });
      res.json( {message: "testing news api", body: response.data} );
    } catch(error) {
      res.json({ error });
    }
}

exports.getArticles = async function(req, res) {
    res.json({message: "get article route has been hit" });
  // try {
  //   const articles = await db.Article.find({});
  //   res.json({ articles });
  // }
  // catch (error) {
  //   res.json({ error });
  // }
}