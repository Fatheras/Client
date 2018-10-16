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
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const passport = require("passport");
const logger_service_1 = require("../../tools/logger-service");
const jwt = require("jsonwebtoken");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", user_controller_1.UserController.getAllUsers);
        this.router.get("/:id", user_controller_1.UserController.getUser);
        this.router.get("/me", (req, res, next) => {
            res.json({
                message: "You made it to the secure route",
                user: req.user,
                token: req.query.secret_token,
            });
        });
        this.router.delete("/:id", user_controller_1.UserController.deleteUser);
        this.router.put("/:id", user_controller_1.UserController.updateUser);
        this.router.post("/signup", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            passport.authenticate("signup", (err, user, info) => {
                if (err) {
                    logger_service_1.errorLog.error("User has already exist");
                    res.sendStatus(400);
                }
                else {
                    logger_service_1.successLog.info("User was added");
                    res.sendStatus(200);
                }
            })(req, res, next);
        }));
        this.router.post("/login", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            passport.authenticate("login", (err, user) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err || !user) {
                        const error = new Error("An Error occured");
                        return next(error);
                    }
                    req.login(user, { session: false }, (error) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return next(error);
                        }
                        const body = { email: user.email };
                        const token = jwt.sign({ user: body }, process.env.SECRET, {
                            expiresIn: 30,
                        });
                        return res.json(token);
                    }));
                }
                catch (error) {
                    return next(error);
                }
            }))(req, res, next);
        }));
    }
}
const userRoutes = new UserRouter();
exports.default = userRoutes.router;
