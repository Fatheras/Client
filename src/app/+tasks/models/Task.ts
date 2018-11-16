import { IUser } from '../../user/models/User';

export interface ITask {
    id?: number;
    title: string;
    cost: number;
    status?: string;
    categoryId: number;
    people: number;
    time: string;
    description: string;
    ownerId?: number;
    user?: IUser;
    countOfDeals?: number;
}
