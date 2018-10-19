import TaskService from "../services/task-service";
import { ITask } from "../models/task";
import CustomError from "../../tools/error";
import { Request, Response } from "express";

export class TaskController {
    public static async getAllTasks(req: Request, res: Response) {

        const tasks: ITask[] = await TaskService.getAllTasks();

        res.status(200).send(tasks);

    }

    public static async getTask(req: Request, res: Response) {

        const task: ITask = await TaskService.getTask(req.params.id);

        if (task) {
            res.status(200).send(task);
        } else {
            throw new CustomError(400);
        }

    }

    public static async deleteTask(req: Request, res: Response) {

        const result: number = await TaskService.deleteTask(req.params.id);

        if (result) {
            res.sendStatus(200);
        } else {
            throw new CustomError(400);
        }

    }

    public static async updateTask(req: Request, res: Response) {

        const taskId = parseInt(req.params.id, 10);
        const model: ITask = req.body;
        const task: ITask = await TaskService.updateTask(taskId, model);

        if (task) {
            res.status(200).send(task);
        } else {
            throw new CustomError(400);
        }

    }

    public static async addTask(req: Request, res: Response) {

        const task: ITask = await TaskService.addTask(req.body);

        if (task) {
            res.status(200).send(task);
        } else {
            throw new CustomError(400);
        }

    }

    public static async getTasksByCategory(req: Request, res: Response) {

        const category = parseInt(req.params.name, 10);

        const tasks: ITask[] = await TaskService.getTasksByCategory(category);

        if (tasks) {
            res.status(200).send(tasks);
        } else {
            throw new CustomError(400);
        }

    }
}
