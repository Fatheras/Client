import { Deal, IDeal } from "../models/deal";

export default class DealService {

    public static async addDeal(deal: IDeal) {
        return Deal.create(deal);
    }

    public static async getDeal(id: number) {
        return Deal.findById(id);
    }

    public static async getAllDeals() {
        return Deal.findAll();
    }

    public static async deleteDeal(id: number) {
        return Deal.destroy({
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

            return this.getDeal(id);
        }
    }

    public static async getDealsByTaskId(taskId: number) {
        return Deal.findAll({
            where: {
                taskId,
            },
        });
    }
}
