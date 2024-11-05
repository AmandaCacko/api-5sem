const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, queueController.getQueues);
router.post('/', authMiddleware, queueController.createQueue);
router.get('/:console', authMiddleware, queueController.getQueuesByConsole);
router.get('/:username', authMiddleware, queueController.getQueuesByUser);
router.post('/:id/join', authMiddleware, queueController.joinQueue);
router.post('/:id/leave', authMiddleware, queueController.leaveQueue);

module.exports = router;
