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
const task_service_1 = require("../services/task-service");
class TaskController {
    static getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send(yield task_service_1.default.getAllTasks());
        });
    }
    static getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let task;
            try {
                task = yield task_service_1.default.getTask(req.params.id);
                if (task) {
                    res.status(200).send(task);
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
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield task_service_1.default.deleteTask(req.params.id);
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
            const taskId = parseInt(req.params.id, 10);
            const model = req.body;
            let task;
            try {
                task = yield task_service_1.default.updateTask(taskId, model);
                if (task) {
                    res.status(200).send(task);
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
    static addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let task;
            try {
                task = yield task_service_1.default.addTask(req.body);
                res.status(200).send(task);
            }
            catch (error) {
                res.send(error.message);
            }
        });
    }
}
exports.TaskController = TaskController;
