const axios = require("axios");
const cheerio = require("cheerio");
// const mongoose = require("mongoose");
// const db = require('../models');

exports.getArticles = async function (req, res) {
  try {
    const pageNum = req.params.pageNum || 1;

    const url = 'https://newsapi.org/v2/everything?' +
      'q=("national park" OR "national parks" OR "state park" OR "state parks") AND (protect OR protected) NOT (kill OR killed OR visit OR "North Face" OR "things to do" OR "ranks best")&' +
      `page=${pageNum}&` +
      'apiKey=6e75f816d0b6424e9bff62fee9c8c460';
    const response = await axios.get(url);

    res.json({ message: "testing news api", body: response.data });
  } catch (error) {
    res.json({ error });
  }
}