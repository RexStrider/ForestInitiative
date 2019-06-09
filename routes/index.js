const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/api/articles/:pageNum', controller.Article.getArticles);
router.get('/api/articles', controller.Article.getArticles);

router.get('/api/civic_info', controller.CivicInfo.getCivicInfo);

router.get('/', (req, res) => res.json({ message: 'main route has been hit!' }))

module.exports = router;