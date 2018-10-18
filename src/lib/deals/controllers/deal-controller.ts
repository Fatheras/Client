import DealService from "../services/deal-service";
import { IDeal } from "../models/deal";

export class DealController {
    public static async getAllDeals(req, res) {
        res.status(200).send(await DealService.getAllDeals());
    }

    public static async getDeal(req, res) {

        let deal: IDeal;

        try {
            deal = await DealService.getDeal(req.params.id);

            if (deal) {
                res.status(200).send(deal);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.sendStatus(400);
        }
    }

    public static async deleteDeal(req, res) {

        let result: number;

        try {
            result = await DealService.deleteDeal(req.params.id);

            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.sendStatus(400);
        }

    }

    public static async updateDeal(req, res) {

        const dealId = parseInt(req.params.id, 10);
        const model: IDeal = req.body;
        let deal: IDeal;

        try {
            deal = await DealService.updateDeal(dealId, model);

            if (deal) {
                res.status(200).send(deal);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.sendStatus(400);
        }

    }

    public static async addDeal(req, res) {

        let deal: IDeal;

        try {
            deal = await DealService.addDeal(req.body);

            res.status(200).send(deal);
        } catch (error) {
            res.send(error.message);
        }

    }

}
