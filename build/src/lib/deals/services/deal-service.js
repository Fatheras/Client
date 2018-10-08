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
const deal_1 = require("../models/deal");
class DealService {
    static addDeal(deal) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield deal_1.Deal.create(deal);
        });
    }
    static getDeal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield deal_1.Deal.findById(id);
        });
    }
    static getAllDeals() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield deal_1.Deal.findAll();
        });
    }
    static deleteDeal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield deal_1.Deal.destroy({
                where: {
                    id,
                },
            });
        });
    }
    static updateDeal(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (model) {
                delete model.id;
                yield deal_1.Deal.update(model, {
                    where: {
                        id,
                    },
                });
                return yield this.getDeal(id);
            }
        });
    }
}
exports.default = DealService;
