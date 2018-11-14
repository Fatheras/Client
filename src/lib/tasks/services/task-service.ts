import { Task, ITask } from "../models/task";
import { Deal, IDeal } from "../../deals/models/deal";
import sequelize, { FindOptions, Op } from "sequelize";
import CustomError from "../../tools/error";
import { Status } from "../models/status";
import DealService from "../../deals/services/deal-service";
import { User } from "../../user/models/user";

export default class TaskService {
    public static async addTask(task: ITask) {
        return await Task.create(task);
    }

    public static async getTask(id: number): Promise<ITask> {
        const task: ITask | null = await Task.findById(id, {
            include: [{
                model: Deal, attributes: [],
            }],
            raw: true,
        });

        if (task) {
            return task;
        } else {
            throw new CustomError(400);
        }
    }

    public static async getAllTasks(): Promise<ITask[]> {
        const tasks: ITask[] = await Task.findAll();

        if (tasks) {
            return tasks;
        } else {
            throw new CustomError(400);
        }
    }

    public static async getAllTasksForUser(query: any, userId: number): Promise<ITask[]> {
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
        };

        if (query.categoryId) {
            Object.assign(options.where, {
                category: query.categoryId,
            });
        }

        return Task.findAll(options);
    }

    public static async getUserTasks(query: any, userId: number): Promise<ITask[]> {
        const options: FindOptions<object> = {
            offset: +query.offset,
            limit: +query.limit,
            order: [["time", "ASC"]],
            where: {
                owner: userId,
            },
        };

        if (query.pattern) {
            Object.assign(options.where,
                {
                    title: {
                        [Op.like]: query.pattern + "%",
                    },
                });
        }

        if (query.categories) {
            Object.assign(options.where, {
                category:
                {
                    [Op.in]: query.categories,
                },
            });
        }

        if (+query.status) {
            Object.assign(options.where, { status: query.status });
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
                    [Op.lt]: query.endDate,
                },
            });
        }

        return Task.findAll(options);
    }

    public static async getTasksForAdmin(query: any): Promise<ITask[]> {
        const options: FindOptions<object> = {
            order: [["time", "ASC"]],
            where: {
                status: {
                    [Op.not]: Status.Declined,
                },
            },
        };

        if (+query.offset) {
            Object.assign(options, { offset: +query.offset });
        }

        if (+query.limit) {
            Object.assign(options, { limit: +query.limit });
        }

        if (query.categories) {
            Object.assign(options.where, {
                category:
                {
                    [Op.in]: query.categories,
                },
            });
        }

        if (+query.status) {
            Object.assign(options.where, { status: +query.status });
        }

        if (query.time) {
            Object.assign(options.where, {
                time: {
                    [Op.between]: [query.startDate, query.endDate],
                },
            });
        }

        if (query.usersIds) {
            Object.assign(options.where, {
                userId:
                    { [Op.in]: query.usersIds },
            });
        }

        return Task.findAll(options);
    }

    public static async getTasksForManager(query: any, categories: number[]): Promise<ITask[]> {
        const options: FindOptions<object> = {
            offset: +query.offset,
            limit: +query.limit,
            order: [["time", "ASC"]],
            where: {
                category: {
                    [Op.in]: categories,
                },
                status: Status.OnReview,
            },
            subQuery: false,
        };

        if (query.selectedCategories) {
            options.where = {
                category:
                {
                    [Op.in]: query.selectedCategories,
                },
            };
        }
        return Task.findAll(options);
    }

    public static async getUsersTasks(query: any): Promise<ITask[]> {
        const options: FindOptions<object> = {
            offset: +query.offset,
            limit: +query.limit,
            order: [["time", "ASC"]],
            where: {},
            include: [{
                model: User, attributes: ["firstName", "lastName"],
            }],
            group: ["Task.id"],
            subQuery: true,
        };

        if (query.pattern) {
            Object.assign(options.where,
                {
                    title: {
                        [Op.like]: query.pattern + "%",
                    },
                });
        }

        if (query.categories) {
            Object.assign(options.where, {
                category:
                {
                    [Op.in]: query.categories,
                },
            });
        }

        if (+query.status) {
            Object.assign(options.where, { status: query.status });
        }

        if (query.owners) {
            Object.assign(options.where, {
                owner: {
                    [Op.in]: query.owners,
                },
            });
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
                    [Op.lt]: query.endDate,
                },
            });
        }

        return Task.findAll(options);
    }

    public static async deleteTask(id: number): Promise<number> {
        return await Task.destroy({
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
