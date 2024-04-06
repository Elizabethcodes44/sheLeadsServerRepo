// trackerRouter.js
import express from 'express';
import {getAllTrackers, createTracker} from '../controllers/tracker.js'
const router = express.Router();
router.get('/',getAllTrackers)
router.post('/',createTracker);

export default router;