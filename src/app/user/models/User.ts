export interface IUser {
    id?: number;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email: string;
    statistic?: IUserStatistic;
    role?: number;
    createdAt?: string;
}

export interface IUserStatistic {
    onReview: number;
    open: number;
    pending: number;
    done: number;
    declined: number;
}
