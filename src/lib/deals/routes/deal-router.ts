import { Router } from "express";
import { DealController } from "../controllers/deal-controller";
import { handleError } from "../../tools/handleError";

class DealRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/", DealController.getAllDeals);
        this.router.get("/:id", handleError(DealController.getDeal));
        this.router.post("/", handleError(DealController.addDeal));
        this.router.put("/:id", DealController.updateDeal);
        this.router.delete("/:id", DealController.deleteDeal);
    }
}

const dealRoutes = new DealRouter();

export default dealRoutes.router;
