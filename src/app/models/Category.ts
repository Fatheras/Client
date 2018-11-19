export interface ICategory {
    id?: number;
    name: string;
    statistic?: ICategoryStatistic;
}

export interface ICategoryStatistic {
    count: number;
    open: number;
}
