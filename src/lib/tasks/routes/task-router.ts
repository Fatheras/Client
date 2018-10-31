import { Router } from "express";
import { TaskController } from "../controllers/task-controller";
import { handleError } from "../../tools/handleError";
import CheckParamsMiddleware from "../../server/models/check-params.middleware";
import * as joi from "joi";

class TaskRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/", handleError(TaskController.getAllTasks));
        this.router.get("/:id", handleError(TaskController.getTask));
        this.router.post("/", CheckParamsMiddleware.validateParamsJoi(joi.object().keys({
            title: joi.string().max(255).required(),
            peoples: joi.number().integer().positive().min(1).max(5).required(),
            category: joi.string().required(),
            cost: joi.number().positive().min(1).required(),
            description: joi.string().max(255).required(),
            time: joi.date().required(),
        })), handleError(TaskController.addTask));
        this.router.put("/:id", handleError(TaskController.updateTask));
        this.router.delete("/:id", handleError(TaskController.deleteTask));
    }
}

const taskRoutes = new TaskRouter();

export default taskRoutes.router;
