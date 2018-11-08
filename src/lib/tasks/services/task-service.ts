import { Task, ITask } from "../models/task";
import { Deal, IDeal } from "../../deals/models/deal";
import sequelize, { FindOptions, Op } from "sequelize";
import CustomError from "../../tools/error";
import { Status } from "../models/status";
import DealService from "../../deals/services/deal-service";
import { Role } from "../../user/models/roles";

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

    public static async onlyGetAllTasks(): Promise<ITask[]> {
        return Task.findAll();
    }

    public static async getAllTasks(query: any, userId: number): Promise<ITask[]> {

        const deals: IDeal[] = await DealService.getUserDeals(userId);
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

    public static async getTasksForAdmin(query: any, userId: number, role: number): Promise<ITask[]> {
        if (role !== Role.Admin) {
            throw new CustomError(400);
        }

        const options: FindOptions<object> = {
            order: [["time", "ASC"]],
            where: {},
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("deals.id")), "countOfDeals"]],
            },
            include: [{
                model: Deal, attributes: [],
            }],
            group: ["Task.id"],
            subQuery: false,
        };
        if (+query.offset) {
            Object.assign(options, { offset: +query.offset });
        }
        if (+query.limit) {
            Object.assign(options, { limit: +query.limit });
        }

        if (+query.category) {
            Object.assign(options.where, { category: +query.category });
        }
        if (+query.status) {
            Object.assign(options.where, { status: +query.status });
        }
        if (query.time) {
            Object.assign(options.where, {
                category: {
                    [Op.between]: [query.startDate, query.endDate],
                },
            });
        }
        if (+query.userId) {
            Object.assign(options.where, { userId: +query.userId });
        }

        return Task.findAll(options);
    }

    public static async getOnReviewTasks(query: any, userId: number, role: number): Promise<ITask[]> {
        if (role !== Role.Admin || Role.Manager) {
            throw new CustomError(400);
        }

        const options: FindOptions<object> = {
            offset: +query.offset,
            limit: +query.limit,
            order: [["time", "ASC"]],
            where: {
                status: query.status,
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

        return Task.findAll(options);
    }

    public static async getUserTasks(query: any, userId: number, role: number): Promise<ITask[]> {

        if (role !== Role.User) {
            throw new CustomError(400);
        }

        const options: FindOptions<object> = {
            order: [["time", "ASC"]],
            where: {
                owner: userId,
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
        if (query.pattern) {
            Object.assign(options.where,
                {
                    title: {
                        [Op.like]: "%" + query.pattern,
                    },
                });
        }

        if (+query.offset) {
            Object.assign(options, { offset: +query.offset });
        }

        if (+query.limit) {
            Object.assign(options, { limit: +query.limit });
        }

        if (+query.category) {
            Object.assign(options.where, { category: +query.category });
        }
        if (+query.status) {
            Object.assign(options.where, { status: +query.status });
        }

        if (query.startDate && query.endDate) {
            Object.assign(options.where, {
                time: {
                    [Op.between]: [query.startDate, query.endDate],
                },
            });
        } else if (query.startDate) {
            Object.assign(options.where, {
                time: {
                    [Op.gt]: query.startDate,
                },
            });
        } else if (query.endDate) {
            Object.assign(options.where, {
                time: {
                    [Op.lt]: query.startDate,
                },
            });
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
