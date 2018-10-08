"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task-controller");
class TaskRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", task_controller_1.TaskController.getAllTasks);
        this.router.get("/:id", task_controller_1.TaskController.getTask);
        this.router.post("/", task_controller_1.TaskController.addTask);
        this.router.put("/:id", task_controller_1.TaskController.updateTask);
        this.router.delete("/:id", task_controller_1.TaskController.deleteTask);
    }
}
const taskRoutes = new TaskRouter();
exports.default = taskRoutes.router;
