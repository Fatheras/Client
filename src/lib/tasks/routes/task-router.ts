import { Router } from "express";
import { TaskController } from "../controllers/task-controller";
import { handleError } from "../../tools/handleError";

class TaskRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/", handleError(TaskController.getAllTasks));
        this.router.get("/:id", handleError(TaskController.getTask));
        this.router.post("/", handleError(TaskController.addTask));
        this.router.put("/:id", handleError(TaskController.updateTask));
        this.router.delete("/:id", handleError(TaskController.deleteTask));
        this.router.get("/category/:name", handleError(TaskController.getTasksByCategory));
    }
}

const taskRoutes = new TaskRouter();

export default taskRoutes.router;
