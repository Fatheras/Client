import { CategoryManager, ICategoryManager } from "../models/category-manager";
import { FindOptions } from "sequelize";

export class CategoryManagerService {

    public static async subscribeCategoryManagers(categoryManagersIds: number[], categoryId: number): Promise<void> {
        const categoryManagers: ICategoryManager[] = categoryManagersIds
            .map((categoryManager, index, arr) => {
                return { userId: categoryManager, categoryId };
            });

        await CategoryManager.bulkCreate(categoryManagers);
    }

    public static async getAllManagersCategories(userId: number): Promise<number[]> {
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
}
