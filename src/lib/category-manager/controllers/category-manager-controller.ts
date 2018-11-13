import { ICategoryManager } from "../models/category-manager";
import { CategoryManagerService } from "../services/category-manager-service";

export class CategoryManagerController {
    public static async addCategoryManager(categoryManager: ICategoryManager) {
        return await CategoryManagerService.addCategoryManager(categoryManager);
    }
}
