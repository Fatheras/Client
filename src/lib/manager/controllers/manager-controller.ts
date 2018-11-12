import { Manager, IManager } from "../models/manager";
import { ManagerService } from "../services/manager-service";

export class ManagerController {
    public static async AddManager(manager: IManager) {
        return await ManagerService.addManager(manager);
    }
}
