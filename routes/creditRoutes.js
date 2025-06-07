import express from 'express';
import {
  getUserCredits,
  updateUserCredits
} from '../controllers/creditController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getUserCredits);
router.put('/', authMiddleware, updateUserCredits);

export default router;
