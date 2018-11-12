import { Router } from "express";
import { ManagerController } from "../controllers/manager-controller";
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

        this.router.post("/", CheckRoleMiddleware.checkRole(Role.Admin),
            CheckParamsMiddleware.validateParamsJoi(joi.object().keys({
                category: joi.string().required(),
                userId: joi.number().integer().positive().required(),
            })), handleError(ManagerController.AddManager));
    }
}

const taskRoutes = new TaskRouter();

export default taskRoutes.router;
