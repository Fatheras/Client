import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import passport = require("passport");
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
        this.router.delete("/:id", UserController.deleteUser);
        this.router.put("/:id", UserController.updateUser);
        this.router.post("/", passport.authenticate("signup", { session: false }),
            async (req, res, next) => {
                res.json({
                    message: "Signup successful",
                    user: req.user,
                });
            });
        this.router.post("/login", async (req, res, next) => {
            passport.authenticate("login", async (err, user, info) => {
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

                        const token = jwt.sign({ user: body }, "top_secret");

                        return res.json({ token });
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
