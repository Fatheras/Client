export interface ITask {
    id?: number;
    title: string;
    cost: number;
    status?: string;
    category: number;
    people: number;
    time: string;
    description: string;
    owner?: number;
    countOfDeals?: number;
}
