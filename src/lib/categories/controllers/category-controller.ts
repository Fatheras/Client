import { Request, Response } from "express";
import { ICategory } from "../models/category";
import CategoryService from "../services/category-service";
import CustomError from "../../tools/error";

export class CategoryController {
    public static async getAllCategories(req: Request, res: Response): Promise<void> {
        const categories: ICategory[] = await CategoryService.getAllCategories();

        res.status(200).send(categories);
    }

    public static async deleteCategory(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        const result: number = await CategoryService.deleteCategory(id);

        if (result) {
            res.sendStatus(200);
        } else {
            throw new CustomError(400);
        }
    }

    public static async addCategory(req: Request, res: Response): Promise<void> {
        const model: ICategory = req.body;
        const category: ICategory = await CategoryService.addCategory(model);

        if (category) {
            res.status(200).send(category);
        } else {
            throw new CustomError(400);
        }
    }
}
