import express from 'express';
import { authenticateAndAttachUser } from '../middlewares/authenticateJWT';
import { getReviewFeedController, submitReviewController } from '../controllers/ReviewControllers';

const router = express.Router();

// Get posts for reviewing (vote-feed)
router.get('/feed', authenticateAndAttachUser, getReviewFeedController);

// Submit a review
router.post('/', authenticateAndAttachUser, submitReviewController);

export default router;