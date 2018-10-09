import { Router } from "express";
import { UserController } from "../controllers/user-controller";

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/", UserController.getAllUsers);
        this.router.get("/:id", UserController.getUser);
        this.router.delete("/:id", UserController.deleteUser);
        this.router.put("/:id", UserController.updateUser);
        this.router.post("/", UserController.addUser);
    }
}

const userRoutes = new UserRouter();

export default userRoutes.router;
