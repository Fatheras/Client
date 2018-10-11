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
const user_1 = require("../../user/models/user");
class UserService {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.findAll();
        });
    }
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.findById(id);
        });
    }
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.create(user);
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.destroy({
                where: {
                    id: parseInt(userId, 10),
                },
            });
        });
    }
    static updateUser(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (model) {
                delete model.id;
                yield user_1.User.update(model, {
                    where: {
                        id,
                    },
                });
                return yield this.getUser(id);
            }
        });
    }
}
exports.default = UserService;
