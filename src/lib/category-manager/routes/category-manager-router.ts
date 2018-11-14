import { Router } from "express";

class CategoryManagerRouter {
    public router: Router;

    constructor() {
        this.router = Router();
    }
}

const taskCategoryManager = new CategoryManagerRouter();

export default taskCategoryManager.router;
