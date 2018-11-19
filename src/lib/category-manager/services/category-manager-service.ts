import { CategoryManager, ICategoryManager } from "../models/category-manager";
import { FindOptions } from "sequelize";
import { Category, ICategory } from "../../categories/models/category";

export class CategoryManagerService {

    public static async subscribeCategoryManagers(categoryManagersIds: number[], categoryId: number): Promise<void> {
        const categoryManagers: ICategoryManager[] = categoryManagersIds
            .map((categoryManager, index, arr) => {
                return { userId: categoryManager, categoryId };
            });

        await CategoryManager.bulkCreate(categoryManagers);
    }

    public static async getAllManagerCategoriesIds(userId: number): Promise<number[]> {
        const options: FindOptions<object> = {
            attributes: ["categoryId"],
            where: {
                userId,
            },
            raw: true,
        };

        return (await CategoryManager.findAll(options) as any[])
            .map((category, index, categories) => category.categoryId);
    }

    public static async getAllManagerCategories(userId: number): Promise<ICategoryManager[]> {
        const options: FindOptions<object> = {
            attributes: ["categoryId"],
            where: {
                userId,
            },
            include: [{
                model: Category,
            }],
            subQuery: false,
            group: "categoryId",
        };

        return await CategoryManager.findAll(options);
    }
}
