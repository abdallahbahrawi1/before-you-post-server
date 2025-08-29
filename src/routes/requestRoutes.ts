import express from 'express';
import { 
  getUserRequestsController,
  getRequestByIdController,
  createRequestController,
  deleteRequestController
} from '../controllers/requestController';
import { authenticateAndAttachUser } from '../middlewares/authenticateJWT';

const router = express.Router();

// Protected routes - require authentication
router.get('/my-requests', authenticateAndAttachUser, getUserRequestsController);
router.get('/:id', getRequestByIdController); // Public - anyone can view a request
router.post('/', authenticateAndAttachUser, createRequestController);
router.delete('/:id', authenticateAndAttachUser, deleteRequestController);

export default router;