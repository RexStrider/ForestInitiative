const axios = require("axios");

const keys = require('../config/keys');

exports.getArticles = async function (req, res) {
  try {
    const pageNum = req.params.pageNum || 1;

    const URL = 'https://newsapi.org/v2/everything?' +
      'q=("national park" OR "national parks" OR "state park" OR "state parks") AND (protect OR protected) NOT (kill OR killed OR visit OR "North Face" OR "things to do" OR "ranks best")&' +
      `page=${pageNum}&` +
      `apiKey=${keys.google_news_api}`;

    const response = await axios.get(URL);

    res.json({ message: "successfully returned news articles", body: response.data });
  } catch (error) {
    res.json({ error });
  }
}