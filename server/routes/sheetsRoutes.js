import express from 'express';
import { saveToGoogleSheet } from '../controllers/sheetsController.js';

const router = express.Router();    

router.post('/', saveToGoogleSheet);

export default router;
