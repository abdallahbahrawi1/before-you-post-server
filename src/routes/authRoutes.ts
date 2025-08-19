import express from 'express';
import passport from 'passport';
import {signup_post, login_post, googleRedirect} from '../controllers/authControllers';
import { authenticateAndAttachUser } from '../middlewares/authenticateJWT';

const router = express.Router();

router.post('/signup', signup_post);
router.post('/login', login_post);

router.get('/me', authenticateAndAttachUser, (req, res) => {
  if(!res.locals.user) {
    return res.status(401).send('Unauthorized');
  }
  const { id, email, fullName } = res.locals.user;
  res.json({ user: {id, email, fullName}})
});

router.get('logout', (req, res) => {
  res.send('Logging out');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google', { session: false }), googleRedirect);


export default router;