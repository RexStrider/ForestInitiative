const axios = require("axios");
const cheerio = require("cheerio");
// const mongoose = require("mongoose");
// const db = require('../models');

exports.scrapeArticles = async function(req, res) {
    try {
      let response = await axios.get('http://www.wilderness.org/articles?_limit=7&_page=1&keywords=&_sort=date&_order=desc&type=4%2C9')
      let $ = cheerio.load(response.data)

      console.log($);

      res.send("scrape route has been hit");

      // TODO: update logic for scraping articles from Wilderness Society
    //   let element = $(`#stream-panel > div > ol > li`)
  
    //   for(let i=1; i <= element.length; i++) {
    //     let href = $(`#stream-panel > div > ol > li:nth-child(${i}) a`).attr('href')
    //     let title = $(`#stream-panel > div > ol > li:nth-child(${i}) h2`).text()
    //     let summary = $(`#stream-panel > div > ol > li:nth-child(${i}) p`).text()
    //     let article = new db.Article({
    //       title: title,
    //       summary: summary,
    //       href: href
    //     });
    //     await article.save();
    //   }
    //   res.render('scraped', {message: "Articles have been scraped"});
    } catch(error) {
      res.render('error', {message: "I'm sorry, an error has occurred. We tried to scrape the articles and failed. This usually occurs when one of the articles getting scrapped has already been saved to the database. I Recommend checking the New York Times articles link below.", error} );
    }
}

exports.getArticles = function(req, res) {
    res.json({message: "get article route has been hit"});
//   try {
//     const articles = await db.Article.find({})
//                                      .populate("notes");
//     res.render('index', {articles});
//   }
//   catch (error) {
//     res.render('error', {message: "I'm sorry, an error has occurred. We could not retrieve any articles. Try navigating to the home page and clicking the NYT Scraper link.", error} );
//   }
}