import { Task, ITask } from "../models/task";
import { Deal } from "../../deals/models/deal";
import sequelize from "sequelize";
import CustomError from "../../tools/error";

export default class TaskService {
    public static async addTask(task: ITask) {
        return Task.create(task);
    }

    public static async getTask(id: number): Promise<ITask> {
        const task: ITask | null = await Task.findById(id, {
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("deals.id")), "countOfDeals"]],
            },
            include: [{
                model: Deal, attributes: [],
            }],
            group: ["Task.id"],
        });

        if (task) {
            return task;
        } else {
            throw new CustomError(400);
        }
    }

    public static async getAllTasks(query: any): Promise<ITask[]> {
        const options: any = {
            order: [["id", "ASC"]],

            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("deals.id")), "countOfDeals"]],
            },

            include: [{
                model: Deal, attributes: [],
            }],
            group: ["Task.id"],
            subQuery: false,

        };

        if (+query.limit) {
            options.limit = +query.limit;
        }

        if (+query.category) {
            options.where = {
                category: +query.category,
            };
        }

        if (+query.offset) {
            options.offset = +query.offset;
        }

        return Task.findAll(options);
    }

    public static async deleteTask(id: number): Promise<number> {
        return Task.destroy({
            where: {
                id,
            },
        });
    }

    public static async updateTask(id: number, model: ITask): Promise<ITask> {
        if (model) {
            delete model.id;

            await Task.update(model, {
                where: {
                    id,
                },
            });

            return this.getTask(id);
        } else {
            throw new CustomError(400);
        }
    }
}
