import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Your logic here
        const googleId = profile.id;
        const email = profile?.emails?.[0]?.value;
        const fullName = profile.displayName;

        if (!email) {
          return done(new Error("No emails from google"), undefined);
        }

        // google id check
        let user = await UserModel.findOne({ googleId });

        if (user) {
          return done(null, user);
        }

        // email check
        user = await UserModel.findOne({ email });

        if (user) {
          user.googleId = googleId;
          await user.save();
          return done(null, user);
        }

        // if none exist, create new user
        const newUser = await UserModel.create({
          email,
          googleId,
          fullName,
        });

        return done(null, newUser);
      } catch (error) {
        // Handle error
        return done(error as Error, undefined);
      }
    }
  )
);

export default passport;
