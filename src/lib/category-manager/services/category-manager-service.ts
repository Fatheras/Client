import { CategoryManager, ICategoryManager } from "../models/category-manager";
import { FindOptions, Op } from "sequelize";

export class CategoryManagerService {

    public static async addCategoryManager(categoryManager: ICategoryManager): Promise<ICategoryManager> {
        return await CategoryManager.create(categoryManager);
    }

    public static async getAllCategoryManagersCategories(query: any, userId: number): Promise<ICategoryManager[]> {
        const options: FindOptions<object> = {
            order: [["time", "ASC"]],
            attributes: ["categoryId"],
            where: {
                categoryId: {
                    [Op.in]: query.categories,
                },
                userId,
            },
            subQuery: false,
        };

        return await CategoryManager.findAll(options);
    }
}
