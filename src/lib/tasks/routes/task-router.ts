import { Router } from "express";
import { TaskController } from "../controllers/task-controller";
import { handleError } from "../../tools/handleError";
import CheckParamsMiddleware from "../../server/models/check-params.middleware";
import * as joi from "joi";
import { Role } from "../../user/models/roles";
import CheckRoleMiddleware from "../../server/models/check-role.middleware";

class TaskRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/tasksForAdmin", CheckRoleMiddleware.checkRole(Role.Admin),
         handleError(TaskController.getTasksForAdmin));
        this.router.get("/getTasksForManager", CheckRoleMiddleware.checkRole(Role.Manager, Role.Admin),
        handleError(TaskController.getTasksForManager));
        this.router.get("/getUserTasks", handleError(TaskController.getUserTasks));
        this.router.get(
            "/getUsersTasks",
            CheckRoleMiddleware.checkRole(Role.Admin),
            handleError(TaskController.getUsersTasks),
        );
        this.router.get("/", handleError(TaskController.getAllTasksForUser));
        this.router.get(":id", handleError(TaskController.getTask));
        this.router.post("/", CheckParamsMiddleware.validateParamsJoi(joi.object().keys({
            title: joi.string().max(255).required(),
            people: joi.number().integer().positive().min(1).max(5).required(),
            category: joi.string().required(),
            cost: joi.number().positive().min(1).required(),
            description: joi.string().max(255).required(),
            time: joi.date().required(),
            token: joi.string().required(),
        })), handleError(TaskController.addTask));
        this.router.put("/", handleError(TaskController.updateTask));
        this.router.delete("/:id", handleError(TaskController.deleteTask));
    }
}

const taskRoutes = new TaskRouter();

export default taskRoutes.router;
