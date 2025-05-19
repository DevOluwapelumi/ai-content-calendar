import express from 'express';
const router = express.Router();
import { generateCalendar } from '../controllers/openaiController.js';

router.post('/', generateCalendar);

export default router;
