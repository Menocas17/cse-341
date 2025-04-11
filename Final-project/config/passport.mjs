import passport from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { Strategy as localStrategy } from 'passport-local';
import { userModel } from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
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

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'local',
  new localStrategy(
    { usernameField: 'user_email' },
    async (user_email, password, done) => {
      try {
        const user = await userModel.findOne({ user_email });
        if (!user)
          return done(null, false, {
            message: 'No user registeres with the provided email',
          });

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) return done(null, false, { message: 'Invalid password' });

        return done(null, user);
      } catch (err) {
        return done(err);
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
