const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
import User from '../database/models/User';
import { IUser } from '../types/types';
import { generateToken } from '../utils/utils';

passport.serializeUser((user: IUser, done: (error: any, user: any) => void) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done: (error: any, user: any) => void) => {
  User.findByPk(id).then((user: any) => {
    done(null, user);
  });
  done(null, id);
});


passport.use(
  new GoogleStrategy({
    // options for the google strategy
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, async (_accessToken: string, _refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
    // passport callback function
    const email = profile.emails[0].value;
    const fullName = profile.displayName;
    const googleId = profile.id;

    let user = await User.findOne({ where: { googleId } });

    if (!user) {
      // Create new user
      user = await User.create({ email, googleId, fullName });
    }

    const token = generateToken((user as unknown as IUser).id);
    // Attach the token to the user object for further handling
    done(null, { user, token });
  })
);