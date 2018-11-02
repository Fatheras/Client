import { Task, ITask } from "../models/task";
import { Deal, IDeal } from "../../deals/models/deal";
import sequelize, { FindOptions, Op } from "sequelize";
import CustomError from "../../tools/error";
import { Status } from "../models/status";
import { IUser } from "../../user/models/user";
import DealService from "../../deals/services/deal-service";

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

    public static async getAllTasks(query: any, userId: number): Promise<ITask[]> {

        const deals: IDeal[] =  await DealService.getUserDeals(userId);
        const taskIds: number[] = deals.map((el, i, arr) => el.taskId);

        const options: FindOptions<object> = {
            offset: +query.offset,
            limit: +query.limit,
            order: [["time", "ASC"]],
            where: {
                status: Status.Open,
                owner: {
                    [Op.not]: userId,
                },
                id: {
                    [Op.not]: taskIds,
                },
            },
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
            Object.assign(options.where, { category: query.category });
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
