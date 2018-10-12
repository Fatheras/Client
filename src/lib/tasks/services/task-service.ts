import { Task, ITask } from "../models/task";

export default class TaskService {

    public static async addTask(task: ITask) {
        return await Task.create(task);
    }

    public static async getTask(id: number) {
        return await Task.findById(id);
    }

    public static async getAllTasks() {
        return await Task.findAll();
    }

    public static async deleteTask(id: number) {
        return await Task.destroy({
            where: {
                id,
            },
        });
    }

    public static async updateTask(id: number, model: ITask) {
        if (model) {
            delete model.id;

            await Task.update(model, {
                where: {
                    id,
                },
            });

            return await this.getTask(id);
        }
    }
}
