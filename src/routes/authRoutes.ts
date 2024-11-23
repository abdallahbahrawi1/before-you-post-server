import express from 'express';
import passport from 'passport';
import {signup_get, login_get, signup_post, login_post, googleRedirect} from '../controllers/authControllers';

const router = express.Router();

router.get('/signup', signup_get);
router.post('/signup', signup_post);
router.get('/login', login_get);
router.post('/login', login_post);

router.get('logout', (req, res) => {
  res.send('Logging out');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google', { session: false }), googleRedirect);


export default router;