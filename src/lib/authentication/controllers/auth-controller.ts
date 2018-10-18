import passport = require("passport");
import { errorLog, successLog } from "../../tools/logger-service";
import * as jwt from "jsonwebtoken";

export class AuthController {

    public static async signUp(req, res, next) {
        return passport.authenticate("signup", (err, user, info) => {
            if (err) {
                errorLog.error("User has already exist");
                res.sendStatus(400);
            } else {
                successLog.info("User was added");
                res.status(200).send(user);
            }
        })(req, res, next);
    }

    public static async signIn(req, res, next) {
        return passport.authenticate("login", async (err, user) => {
            try {
                if (err || !user) {
                    const error = new Error("An Error occured");
                    return next(error);
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) {
                        return next(error);
                    }

                    const body = { email: user.email };

                    const token = jwt.sign({ user: body }, process.env.SECRET, {
                        expiresIn: 60,
                    });
                    return res.json(token);
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    }
}
