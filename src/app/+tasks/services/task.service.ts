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

    public getAllTasks(category?: number, lastSeen?, batchSize?): Observable<ITask[]> {
        let params = new HttpParams()
            .set('offset', lastSeen + '')
            .set('limit', batchSize + '');

        if (category) {
            params = params.set('category', category + '');
        }

        return this.http.get<ITask[]>(this.url + '/tasks', { params });
    }

    public getTask(id) {
        return this.http.get<ITask>(this.url + `/tasks/${id}`);
    }

    public getUserTasks(filter?, lastSeen?, batchSize?): Observable<ITask[]> {
        let params = new HttpParams()
            .set('offset', lastSeen + '')
            .set('limit', batchSize + '');

        if (filter) {
            params = params
                .set('category', filter.category)
                .set('status', filter.status)
                .set('startDate', filter.startDate)
                .set('endDate', filter.endDate)
                .set('pattern', filter.pattern);
        }

        return this.http.get<ITask[]>(this.url + '/tasks/getUserTasks', { params });
    }

    public updateTask(taskId: number, model: ITask) {
        return this.http.put<ITask>(this.url + `/tasks/${taskId}`, model);
    }

    public addTask(task: ITask) {
        return this.http.post<ITask>(this.url + '/tasks', task);
    }

    public deleteTask(taskId: number) {
        return this.http.delete<void>(this.url + `/tasks/${taskId}`);
    }
}
