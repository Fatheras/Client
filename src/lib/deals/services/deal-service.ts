import {User, IUser} from "../../user/models/user";
import {Task, ITask} from "../../tasks/models/task";
import {Deal, IDeal} from "../models/deal";

export default class DealService {

    public static async addDeal(deal: IDeal) {
        return await Deal.create(deal);
    }

    public static async getDeal(id: number) {
        return await Deal.findById(id);
    }

    public static async getAllDeals() {
        return await Deal.findAll();
    }

    public static async deleteDeal(id: number) {
        return await Deal.destroy({
            where: {
                id,
            },
        });
    }

    public static async updateDeal(id: number, model: IDeal) {
        if (model) {
            delete model.id;

            await Deal.update(model, {
                where: {
                    id,
                },
            });

            return await this.getDeal(id);
        }

    }

}
