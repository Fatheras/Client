import * as passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { User } from "../../user/models/user";
import UserService from "../../user/services/user-service";
import { Strategy as JWTstrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";
import { Role } from "../../user/models/roles";

export default class AuthService {

    public static setUpPassport() {
        AuthService.setSignUp();
        AuthService.setLogIn();
        AuthService.setCheckAccess();
    }

    private static async setSignUp() {
        passport.use("signup", new localStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        }, async (req, email, password, done) => {
            try {
                const user = await UserService.addUser({ email, password, phone: req.body.phone, role: Role.User });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }));
    }

    private static async setLogIn() {
        passport.use("login", new localStrategy({
            usernameField: "email",
            passwordField: "password",
        }, async (email, password, done) => {
            try {

                const user = await User.findOne({ where: { email } });
                if (!user) {

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

    private static async setCheckAccess() {

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
