import TaskService from "../services/task-service";
import { ITask } from "../models/task";
import { IUser } from "../../user/models/user";

export class TaskController {
    public static async getAllTasks(req, res) {
        res.status(200).send(await TaskService.getAllTasks());
    }

    public static async getTask(req, res) {

        let task: ITask;

        try {
            task = await TaskService.getTask(req.params.id);

            if (task) {
                res.status(200).send(task);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.sendStatus(400);
        }
    }

    public static async deleteTask(req, res) {

        let result: number;

        try {
            result = await TaskService.deleteTask(req.params.id);

            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.sendStatus(400);
        }

    }

    public static async updateTask(req, res) {

        const taskId = parseInt(req.params.id, 10);
        const model: ITask = req.body;
        let task: ITask;

        try {
            task = await TaskService.updateTask(taskId, model);

            if (task) {
                res.status(200).send(task);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.sendStatus(400);
        }

    }

    public static async addTask(req, res) {

        let task: ITask;

        try {
            task = await TaskService.addTask(req.body);

            res.status(200).send(task);
        } catch (error) {
            res.send(error.message);
        }

    }
}
