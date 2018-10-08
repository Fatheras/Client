"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HomeRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/admin', (req, res) => res.send("Hello admin"));
    }
}
const homeRoutes = new HomeRouter();
exports.default = homeRoutes.router;
//# sourceMappingURL=user.js.map