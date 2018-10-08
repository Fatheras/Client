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
        this.router.get("/user", user_controller_1.UserController.getUser);
    }
}
const userRoutes = new UserRouter();
exports.default = userRoutes.router;
//# sourceMappingURL=user.js.map