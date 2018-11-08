import { Request, Response } from "express";
import { ICategory, Category } from "../models/category";
import CategoryService from "../services/category-service";
import CustomError from "../../tools/error";
import DealService from "../../deals/services/deal-service";
import { IDeal } from "../../deals/models/deal";
import { ITask } from "../../tasks/models/task";
import TaskService from "../../tasks/services/task-service";
import { Status } from "../../tasks/models/status";

export class CategoryController {
    public static async getAllCategories(req: Request, res: Response): Promise<void> {
        const categories: ICategory[] = await CategoryService.getAllCategories();

        res.status(200).send(categories);
    }

    public static async getCategoriesTaskCount(req: Request, res: Response): Promise<void> {
        const categories: any = await CategoryService.getAllCategories();
        const taskCountArray: number[] = [];
        const openTaskCountArray: number[] = [];
        const tasks: ITask[] = await TaskService.onlyGetAllTasks();

        for (let i = 0; i < categories.length; i++) {
            taskCountArray[i] = 0;
            openTaskCountArray[i] = 0;
            for (const task of tasks) {
                if (task.category === categories[i].id) {
                    taskCountArray[i]++;
                }

                if (task.category === categories[i].id && task.status === Status.Open) {
                    openTaskCountArray[i]++;
                }
            }
        }

        res.status(200).send({ taskCountArray, openTaskCountArray });
    }

    public static async getCategory(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        const category: ICategory = await CategoryService.getCategory(id);

        if (category) {
            res.status(200).send(category);
        } else {
            throw new CustomError(404);
        }
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
