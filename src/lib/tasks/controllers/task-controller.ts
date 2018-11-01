import TaskService from "../services/task-service";
import { ITask } from "../models/task";
import CustomError from "../../tools/error";
import { Request, Response } from "express";

export class TaskController {
    public static async getAllTasks(req: Request, res: Response): Promise<void> {
        let tasks: ITask[];

        tasks = await TaskService.getAllTasks(req.query);

        res.status(200).send(tasks);
    }

    public static async getTask(req: Request, res: Response): Promise<void> {
        const task: ITask = await TaskService.getTask(req.params.id);

        if (task) {
            res.status(200).send(task);
        } else {
            throw new CustomError(400);
        }
    }

    public static async deleteTask(req: Request, res: Response): Promise<void> {
        const result: number = await TaskService.deleteTask(req.params.id);

        if (result) {
            res.sendStatus(200);
        } else {
            throw new CustomError(400);
        }
    }

    public static async updateTask(req: Request, res: Response): Promise<void> {
        const taskId = parseInt(req.params.id, 10);
        const model: ITask = req.body;
        const task: ITask = await TaskService.updateTask(taskId, model);

        if (task) {
            res.status(200).send(task);
        } else {
            throw new CustomError(400);
        }
    }

    public static async addTask(req: Request, res: Response): Promise<void> {
        const task: ITask = await TaskService.addTask(req.body);

        if (task) {
            res.status(200).send(task);
        } else {
            throw new CustomError(400);
        }
    }
}
