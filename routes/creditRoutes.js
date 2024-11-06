const express = require('express');
const router = express.Router();
const creditController = require('../controllers/creditController');
const authMiddleware = require('../middlewares/authMiddleware');
const creditMiddleware = require('../middlewares/creditMiddleware');

// Rota para obter os créditos do usuário
router.get('/', authMiddleware, creditController.getCredits);

// Rota para adicionar créditos
router.post('/add', authMiddleware, creditController.addCredits);

// Rota para realizar uma compra (exemplo)
router.post('/purchase', authMiddleware, creditMiddleware, creditController.purchase);

module.exports = router;
