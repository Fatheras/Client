import passport = require("passport");
import { log } from "../../tools/logger-service";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export class AuthController {
    public static async signUp(req: Request, res: Response, next: NextFunction) {
        return passport.authenticate("signup", (err: Error, info: any) => {
            if (err) {
                log.error("User has already exist");
                res.sendStatus(400);
            } else {
                log.info("User was added");
                res.status(200).send();
            }
        })(req, res, next);
    }

    public static async signIn(req: Request, res: Response, next: NextFunction) {
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

                    const token = jwt.sign({ user: body }, process.env.SECRET!, {
                        expiresIn: "30 days",
                    });

                    return res.json({token, user: user.role});
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    }
}
