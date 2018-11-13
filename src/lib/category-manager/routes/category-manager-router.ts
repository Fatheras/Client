import { Router } from "express";
import { CategoryManagerController } from "../controllers/category-manager-controller";
import { handleError } from "../../tools/handleError";
import CheckParamsMiddleware from "../../server/models/check-params.middleware";
import * as joi from "joi";
import { Role } from "../../user/models/roles";
import CheckRoleMiddleware from "../../server/models/check-role.middleware";

class CategoryManagerRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {

        // this.router.post("/", CheckRoleMiddleware.checkRole(Role.Admin),
        //     CheckParamsMiddleware.validateParamsJoi(joi.object().keys({
        //         category: joi.string().required(),
        //         userId: joi.number().integer().positive().required(),
        //     })), handleError(CategoryManagerController.));
    }
}

const taskCategoryManager = new CategoryManagerRouter();

export default taskCategoryManager.router;
