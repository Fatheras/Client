"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deal_controller_1 = require("../controllers/deal-controller");
class DealRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", deal_controller_1.DealController.getAllDeal);
        this.router.get("/:id", deal_controller_1.DealController.getDeal);
        this.router.post("/", deal_controller_1.DealController.addDeal);
        this.router.put("/:id", deal_controller_1.DealController.updateDeal);
        this.router.delete("/:id", deal_controller_1.DealController.deleteDeal);
    }
}
const dealRoutes = new DealRouter();
exports.default = dealRoutes.router;
