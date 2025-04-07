import passport from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { userModel } from '../models/usersModels.mjs';
import dotenv from 'dotenv';
dotenv.config();

passport.use(
  'google',
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ googleId: profile.id });
        if (!user) {
          const fullName = profile.displayName.split(' ');
          const name = fullName[0];
          const lastName = fullName[1];
          user = await userModel.create({
            name,
            lastName,
            email: profile.emails[0].value,
            googleId: profile.id,
            photo: profile.photos[0].value,
          });
        }

        if (user.role === 'admin') {
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  userModel.findById(id).then((user) => done(null, user));
});

export default passport;
