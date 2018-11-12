import { Manager, IManager } from "../models/manager";

export class ManagerService {

    public static async addManager(manager: IManager): Promise<IManager> {
        return await Manager.create(manager);
    }
}
