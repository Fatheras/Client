import { Router } from "express";
import { CategoryController } from "../controllers/category-controller";
import { handleError } from "../../tools/handleError";

class CategoryRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/", handleError(CategoryController.getAllCategories));
    }
}

const categoryRoutes = new CategoryRouter();

export default categoryRoutes.router;
