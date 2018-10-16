import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import passport = require("passport");
import { errorLog, successLog } from "../../tools/logger-service";
import * as jwt from "jsonwebtoken";

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/", UserController.getAllUsers);
        this.router.get("/:id", UserController.getUser);
        this.router.get("/me", (req, res, next) => {

            res.json({
                message: "You made it to the secure route",
                user: req.user,
                token: req.query.secret_token,
            });
        });

        this.router.delete("/:id", UserController.deleteUser);
        this.router.put("/:id", UserController.updateUser);
        this.router.post("/signup", async (req, res, next) => {
            passport.authenticate("signup", (err, user, info) => {
                if (err) {
                    errorLog.error("User has already exist");
                    res.sendStatus(400);
                } else {
                    successLog.info("User was added");
                    res.sendStatus(200);
                }
            })(req, res, next);
        });
        this.router.post("/login", async (req, res, next) => {
            passport.authenticate("login", async (err, user) => {
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
                            expiresIn: 30,
                        });
                        return res.json(token);
                    });
                } catch (error) {
                    return next(error);
                }
            })(req, res, next);
        });
    }
}

const userRoutes = new UserRouter();

export default userRoutes.router;
