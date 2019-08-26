const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/articles/:pageNum', controller.Article.getArticles);
router.get('/articles', controller.Article.getArticles);

router.get('/civic_info/:address', controller.CivicInfo.getCivicInfo);
router.get('/civic_info', controller.CivicInfo.getCivicInfo);

router.get('/payment', controller.Payment.getPayment);
// router.get('/api/payment', controller.Payment.getPayment);

// router.get('/', (req, res) => res.json({ message: 'main route has been hit!' }))

module.exports = router;