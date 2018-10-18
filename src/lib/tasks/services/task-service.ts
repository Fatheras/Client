import { Task, ITask } from "../models/task";
import { Deal } from "../../deals/models/deal";
import sequelize from "sequelize";

export default class TaskService {

    public static async addTask(task: ITask) {
        return Task.create(task);
    }

    public static async getTask(id: number) {
        return Task.findById(id);
    }

    public static async getAllTasks() {
        return Task.findAll({
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("deals.id")), "countOfDeals"]],
            },
            include: [{
                model: Deal, attributes: [],
            }],
            group: ["Task.id"],
        });
    }

    public static async deleteTask(id: number) {
        return Task.destroy({
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

            return this.getTask(id);
        }
    }

    public static async getTasksByCategory(category: number) {
        return Task.findAll({
            where: {
                category,
            },
        });
    }
}
