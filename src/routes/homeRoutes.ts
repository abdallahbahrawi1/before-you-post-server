import express from 'express'
import { home_get } from '../controllers/homeControllers';
import { authenticateAndAttachUser } from '../middlewares/authenticateJWT';


const router = express.Router();

router.get('/', authenticateAndAttachUser, home_get);

export default router