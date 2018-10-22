import { ICategory, Category } from "../models/category";

export default class CategoryService {
    public static async getAllCategories(): Promise<ICategory[]> {
        return Category.findAll();
    }
}
