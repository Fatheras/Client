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
const task_1 = require("../models/task");
class TaskService {
    static addTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_1.Task.create(task);
        });
    }
    static getTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_1.Task.findById(id);
        });
    }
    static getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_1.Task.findAll();
        });
    }
    static deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_1.Task.destroy({
                where: {
                    id,
                },
            });
        });
    }
    static updateTask(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (model) {
                delete model.id;
                yield task_1.Task.update(model, {
                    where: {
                        id,
                    },
                });
                return yield this.getTask(id);
            }
        });
    }
    static registerUser(task, user) {
        task_1.Task.ad(task.id);
    }
    static changeStatus(task, status) {
        return 1;
    }
}
exports.default = TaskService;
//# sourceMappingURL=task-service.js.map