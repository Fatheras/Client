import TaskService from "../services/task-service";
import { ITask } from "../models/task";
import CustomError from "../../tools/error";
import { Request, Response } from "express";
import { Status } from "../models/status";
import moment from "moment";
import * as jwt from "jsonwebtoken";
import UserService from "../../user/services/user-service";
import { IUser } from "../../user/models/user";

export class TaskController {
    public static async getAllTasks(req: Request, res: Response): Promise<void> {
        let tasks: ITask[];
        const token: string = req.query.token;
        const email: any = jwt.decode(token);
        const user = await UserService.getUserByEmail(email);
        tasks = await TaskService.getAllTasks(req.query as ITask, user.id!);

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
        const taskModel: ITask = req.body;
        if (taskModel) {
            taskModel.status = Status.OnReview;
        } else {
            throw new CustomError(400);
        }
        const token: string = req.body.token;
        const email: any = jwt.decode(token);
        const user: IUser = await UserService.getUserByEmail(email);

        const fiftyNineMinutes: number = 59 * 60000;
        const msTime: number = Date.parse(taskModel.time);
        const msCurrentTime: number = Date.now();

        if (msTime < (msCurrentTime + fiftyNineMinutes)) {
            throw new CustomError(400);
        }

        const time = new Date(taskModel.time);

        taskModel.time = moment(taskModel.time)
            .hours(time.getHours() + time.getTimezoneOffset() / 60).format("YYYY-MM-DD kk:mm:ss");

        taskModel.owner = user.id!;

        const task: ITask = await TaskService.addTask(taskModel);

        if (task) {
            res.status(200).send(task);
        } else {
            throw new CustomError(400);
        }
    }
}
