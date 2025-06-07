import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getUser);
router.put('/', authMiddleware, updateUser);
router.delete('/', authMiddleware, deleteUser);

export default router;
