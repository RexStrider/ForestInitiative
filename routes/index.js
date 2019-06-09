const express = require('express');
const articleController = require('../controllers/article');

const router = express.Router();

router.get('/api/articles/scrape/:pageNum', articleController.scrapeArticles);
router.get('/api/articles/scrape', articleController.scrapeArticles);
router.get('/api/articles', articleController.getArticles);
router.get('/', (req, res) => res.json({ message: 'main route has been hit!' }))

module.exports = router;