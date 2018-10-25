import { IUser, IUserStatistic } from "../../user/models/user";
import CustomError from "../../tools/error";
import UserService from "./user-service";
import db from "../../db/models/db";
import { Task } from "../../tasks/models/task";
import sequelize = require("sequelize");

interface IStatistic {
    status: string;
    count: number;
}

export default class StatisticService {
    public static async getStatistic(id: number): Promise<IUserStatistic> {
        const cleanStat: IStatistic[] = [];

        const stat: any = await Task.findAll({
            attributes: ["status", [sequelize.fn("COUNT", "*"), "count"]],
            where: {
                owner: id,
            },
            group: ["status"],
        });

        for (const item of stat) {
            cleanStat.push((item as sequelize.Instance<IStatistic>).get({plain: true}) as IStatistic);
        }

        const statistic: IUserStatistic = {
            approved: 0,
            declined: 0,
            opened: 0,
            closed: 0,
        };

        for (const value of cleanStat) {
            statistic![value.status] = value.count;
        }

        return statistic;
    }
}
