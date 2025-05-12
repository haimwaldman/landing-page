import express from 'express';
import {
  getAllContent,
  createContent,
  updateContent,
  deleteContent,
  updateConfig
} from '../controllers/content.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllContent);
router.post('/', authMiddleware, createContent);
router.put('/:id', authMiddleware, updateContent);
router.delete('/:id', authMiddleware, deleteContent);
router.put('/config', authMiddleware, updateConfig);

export default router;
