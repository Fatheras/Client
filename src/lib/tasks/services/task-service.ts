import { Task, ITask } from "../models/task";
import { Deal } from "../../deals/models/deal";
import sequelize, { FindOptions } from "sequelize";
import CustomError from "../../tools/error";

export default class TaskService {
    public static async addTask(task: ITask) {
        return await Task.create(task);
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
            raw: true,
        });

        if (task) {
            return task;
        } else {
            throw new CustomError(400);
        }
    }

    public static async getAllTasks(query: any): Promise<ITask[]> {
        const options: FindOptions<object> = {
            offset: +query.offset,
            limit: +query.limit,
            order: [["time", "ASC"]],

            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("deals.id")), "countOfDeals"]],
            },
            include: [{
                model: Deal, attributes: [],
            }],
            group: ["Task.id"],
            subQuery: false,
        };

        if (+query.category) {
            options.where = {
                category: +query.category,
            };
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
