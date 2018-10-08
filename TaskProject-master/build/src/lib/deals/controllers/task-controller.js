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
const deal_service_1 = require("../services/deal-service");
class DealController {
    static getAllDeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send(yield deal_service_1.default.getAllDeals());
        });
    }
    static getDeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let deal;
            try {
                deal = yield deal_service_1.default.getDeal(req.params.id);
                if (deal) {
                    res.status(200).send(deal);
                }
                else {
                    res.sendStatus(404);
                }
            }
            catch (error) {
                res.sendStatus(400);
            }
        });
    }
    static deleteDeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield deal_service_1.default.deleteDeal(req.params.id);
                if (result) {
                    res.sendStatus(204);
                }
                else {
                    res.sendStatus(404);
                }
            }
            catch (error) {
                res.sendStatus(400);
            }
        });
    }
    static updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dealId = parseInt(req.params.id, 10);
            const model = req.body;
            let deal;
            try {
                deal = yield deal_service_1.default.updateDeal(dealId, model);
                if (deal) {
                    res.status(200).send(deal);
                }
                else {
                    res.sendStatus(404);
                }
            }
            catch (error) {
                res.sendStatus(400);
            }
        });
    }
    static addDeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let deal;
            try {
                deal = yield deal_service_1.default.addDeal(req.body);
                res.status(200).send(deal);
            }
            catch (error) {
                res.send(error.message);
            }
        });
    }
}
exports.DealController = DealController;
//# sourceMappingURL=task-controller.js.map