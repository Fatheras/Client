import { Request, Response } from "express";
import { ICategory } from "../models/category";
import CategoryService from "../services/category-service";

export class CategoryController {
    public static async getAllCategories(req: Request, res: Response): Promise<void> {
        const categories: ICategory[] = await CategoryService.getAllCategories();

        res.status(200).send(categories);
    }
}
