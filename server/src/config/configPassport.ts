import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import passport from 'passport';
import { NativeError } from 'mongoose';
import { compare } from 'bcrypt';
import { IUser, User } from '../models/user';
import {
  getUserByEmailWithPassword,
  getUserById,
} from '../services/user.service';

/**
 * Middleware to check if a user is authenticated using the Local Strategy.
 * @param email Email of the user
 * @param password Password of the user
 * @param done Callback function to return
 */
const verifyLocalUser = (
  email: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions | undefined) => void,
): void => {
  // Match user with email
  getUserByEmailWithPassword(email)
    .then((user: any) => {
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      // Match user with password
      compare(password, user.password, (err: any, isMatch: boolean) => {
        if (err) {
          console.log(err);
          console.log(user);
          return done(err);
        }
        if (isMatch) {
          delete user.password;
          return done(null, user);
        }
        return done(null, false, { message: 'Incorrect password.' });
      });
    })
    .catch((error: any) => {
      console.log(error);
      return done(error);
    });
};

/**
 * Initializes all the configurations for passport regarding strategies.
 * @param passport The passport instance to use.
 */
const initializePassport = (passport: passport.PassportStatic) => {
  // Set up middleware to use for each type of auth strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Treat email field in request as username
      },
      verifyLocalUser,
    ),
  );

  // Set up serialization and deserialization of user objects
  passport.serializeUser((user: any, done: any) => {
    done(null, user._id);
  });
  passport.deserializeUser((id: any, done: any) => {
    getUserById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};

export default initializePassport;
