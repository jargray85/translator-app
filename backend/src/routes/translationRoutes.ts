import { Router } from 'express';
import { handleTranslate } from '../controllers/translationController';

const router = Router();

// Translation endpoint
router.post('/translate', handleTranslate);

export default router; 