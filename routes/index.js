const express = require('express');
const articleController = require('../controllers/article');

const router = express.Router();

router.get('/api/articles', articleController.getArticles);
router.get('/api/articles/scrape', articleController.scrapeArticles);

module.exports = router;