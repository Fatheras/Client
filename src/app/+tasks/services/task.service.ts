import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITask } from '../models/Task';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private url = `${environment.url}`;

    constructor(private http: HttpClient) {
    }

    public getAllTasks(categoryId?: number, lastSeen?: number, batchSize?: number): Observable<ITask[]> {
        let params = new HttpParams()
            .set('offset', lastSeen + '')
            .set('limit', batchSize + '');

        if (categoryId) {
            params = params.set('categoryId', categoryId + '');
        }

        return this.http.get<ITask[]>(this.url + '/tasks', { params });
    }

    public getTask(id: number): Observable<ITask> {
        return this.http.get<ITask>(this.url + `/tasks/${id}`);
    }

    public getTasksForManager(filter, lastSeen?: number, batchSize?: number): Observable<ITask[]> {
        let params = new HttpParams()
            .set('offset', lastSeen + '')
            .set('limit', batchSize + '');

        if (filter) {
            params = params
                .set('categories', JSON.stringify(filter.categories))
                .set('pattern', filter.pattern);
        }

        return this.http.get<ITask[]>(this.url + '/tasks/getTasksForManager', { params });
    }

    public getUserTasks(filter?, lastSeen?: number, batchSize?: number): Observable<ITask[]> {
        let params = new HttpParams()
            .set('offset', lastSeen + '')
            .set('limit', batchSize + '');

        if (filter) {
            params = params
                .set('categories', JSON.stringify(filter.categories))
                .set('status', filter.status)
                .set('startDate', filter.startDate)
                .set('endDate', filter.endDate)
                .set('pattern', filter.pattern);
        }

        return this.http.get<ITask[]>(this.url + '/tasks/getUserTasks', { params });
    }

    public getTasksForAdmin(filter?, lastSeen?: number, batchSize?: number): Observable<ITask[]> {
        let params = new HttpParams()
            .set('offset', lastSeen + '')
            .set('limit', batchSize + '');

        if (filter) {
            params = params
                .set('usersIds', JSON.stringify(filter.users))
                .set('categories', JSON.stringify(filter.categories))
                .set('status', filter.status)
                .set('startDate', filter.startDate)
                .set('endDate', filter.endDate)
                .set('pattern', filter.pattern);
        }

        return this.http.get<ITask[]>(this.url + '/tasks/tasksForAdmin', { params });
    }

    public updateTask(taskId: number, model: ITask): Observable<ITask> {
        return this.http.put<ITask>(this.url + `/tasks/${taskId}`, model);
    }

    public updateTaskStatus(taskId: number, newStatus: number): Observable<ITask> {
        return this.http.put<ITask>(this.url + `/tasks/${taskId}/updateStatus`, {status: newStatus});
    }

    public addTask(task: ITask): Observable<ITask> {
        return this.http.post<ITask>(this.url + '/tasks', task);
    }

    public deleteTask(taskId: number): Observable<void> {
        return this.http.delete<void>(this.url + `/tasks/${taskId}`);
    }
}
