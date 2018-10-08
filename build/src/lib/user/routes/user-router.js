"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", user_controller_1.UserController.getAllUsers);
        this.router.get("/:id", user_controller_1.UserController.getUser);
        this.router.delete("/:id", user_controller_1.UserController.deleteUser);
        this.router.put("/:id", user_controller_1.UserController.updateUser);
        this.router.post("/", user_controller_1.UserController.addUser);
    }
}
const userRoutes = new UserRouter();
exports.default = userRoutes.router;
