import * as passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { User } from "../user/models/user";
import UserService from "../user/services/user-service";
import { Strategy as JWTstrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";

export default class AuthService {

    public static async signUp() {
        passport.use("signup", new localStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        }, async (req, email, password, done, error) => {
            try {
                const user = await UserService.addUser({ email, password, phone: req.body.phone });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }));
    }

    public static async logIn() {
        passport.use("login", new localStrategy({
            usernameField: "email",
            passwordField: "password",
        }, async (email, password, done) => {
            try {
                // Find the user associated with the email provided by the user
                const user = await User.findOne({ where: { email } });
                if (!user) {
                    // If the user isn"t found in the database, return a message
                    return done(null, false, { message: "User not found" });
                }
                const validate = await User.isValidPassword(user, password);
                if (!validate) {
                    return done(null, false, { message: "Wrong Password" });
                }
                return done(null, user, { message: "Logged in Successfully" });
            } catch (error) {
                return done(error);
            }
        }));
    }
    public static async checkAccess() {

        passport.use(new JWTstrategy({
            secretOrKey: "top_secret",
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
        }, async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }));
    }
}
