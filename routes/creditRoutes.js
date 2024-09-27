const express = require('express');
const router = express.Router();
const creditController = require('../controllers/creditController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, creditController.getCredits);
router.post('/add', authMiddleware, creditController.addCredits);

module.exports = router;
