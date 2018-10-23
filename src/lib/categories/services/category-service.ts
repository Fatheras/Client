import { ICategory, Category } from "../models/category";

export default class CategoryService {
    public static async getAllCategories(): Promise<ICategory[]> {
        return Category.findAll();
    }

    public static async deleteCategory(id: number): Promise<number> {
        return Category.destroy({
            where: {
                id,
            },
        });
    }

    public static async addCategory(category: ICategory): Promise<ICategory> {
        return Category.create(category);
    }
}
