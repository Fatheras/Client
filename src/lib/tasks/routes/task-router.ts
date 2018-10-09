import { Router } from "express";
import { TaskController } from "../controllers/task-controller";

class TaskRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/", TaskController.getAllTasks);
        this.router.get("/:id", TaskController.getTask);
        this.router.post("/", TaskController.addTask);
        this.router.put("/:id", TaskController.updateTask);
        this.router.delete("/:id", TaskController.deleteTask);
    }
}

const taskRoutes = new TaskRouter();

export default taskRoutes.router;
