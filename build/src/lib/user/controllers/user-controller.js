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
const user_service_1 = require("../services/user-service");
class UserController {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send(yield user_service_1.default.getAllUsers());
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield user_service_1.default.getUser(req.params.id);
                if (user) {
                    res.status(200).send(user);
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
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield user_service_1.default.addUser(req.body);
                res.status(200).send(user);
            }
            catch (error) {
                res.send(error.message);
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield user_service_1.default.deleteUser(req.params.id);
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
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id, 10);
            const model = req.body;
            let user;
            try {
                user = yield user_service_1.default.updateUser(userId, model);
                if (user) {
                    res.status(200).send(user);
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
}
exports.UserController = UserController;
