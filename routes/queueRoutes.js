import express from 'express';
import * as queueController from '../controllers/queueController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, queueController.getQueues);
router.post('/', authMiddleware, queueController.createQueue);
router.get('/console/:console', authMiddleware, queueController.getQueuesByConsole);
router.get('/user/:username', authMiddleware, queueController.getQueuesByUser);
router.post('/:id/join', authMiddleware, queueController.joinQueue);
router.post('/:id/leave', authMiddleware, queueController.leaveQueue);

export default router;
