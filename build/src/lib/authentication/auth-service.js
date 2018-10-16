"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_local_1 = require("passport-local");
const user_1 = require("../user/models/user");
const user_service_1 = require("../user/services/user-service");
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
class AuthService {
    static signUp() {
        return __awaiter(this, void 0, void 0, function* () {
            passport.use("signup", new passport_local_1.Strategy({
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            }, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield user_service_1.default.addUser({ email, password, phone: req.body.phone });
                    return done(null, user);
                }
                catch (error) {
                    return done(error);
                }
            })));
        });
    }
    static logIn() {
        return __awaiter(this, void 0, void 0, function* () {
            passport.use("login", new passport_local_1.Strategy({
                usernameField: "email",
                passwordField: "password",
            }, (email, password, done) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Find the user associated with the email provided by the user
                    const user = yield user_1.User.findOne({ where: { email } });
                    if (!user) {
                        // If the user isn"t found in the database, return a message
                        return done(null, false, { message: "User not found" });
                    }
                    const validate = yield user_1.User.isValidPassword(user, password);
                    if (!validate) {
                        return done(null, false, { message: "Wrong Password" });
                    }
                    return done(null, user, { message: "Logged in Successfully" });
                }
                catch (error) {
                    return done(error);
                }
            })));
        });
    }
    static checkAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            passport.use(new passport_jwt_1.Strategy({
                secretOrKey: "top_secret",
                jwtFromRequest: passport_jwt_2.ExtractJwt.fromUrlQueryParameter("secret_token"),
            }, (token, done) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return done(null, token.user);
                }
                catch (error) {
                    done(error);
                }
            })));
        });
    }
}
exports.default = AuthService;
