import { Router } from "express";
import { CategoryManagerController } from "../controllers/category-manager-controller";
import { handleError } from "../../tools/handleError";
import { Role } from "../../user/models/roles";
import CheckRoleMiddleware from "../../server/models/check-role.middleware";

class CategoryManagerRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/getAllManagerCategories", CheckRoleMiddleware.checkRole(Role.Manager, Role.Admin),
            handleError(CategoryManagerController.getAllManagersCategories));
    }
}

const manager = new CategoryManagerRouter();

export default manager.router;
