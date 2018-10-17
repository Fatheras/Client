import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/Task';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private url: string = environment.url;

    constructor(private http: HttpClient) {
    }

    getTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>(`${this.url}/tasks`);
    }
    // until better days
    /*getTask(id: number): Observable<ITask> {
        return this.http.get<ITask>(this.url + id);
    }
    createTask(task: ITask) {
        return this.http.post(this.url, task);
    }

    editTask(task: ITask) {
        return this.http.put(this.url + task.id, task);
    }

    deleteTask(id: number) {
        return this.http.delete(this.url + id);
    } */
}
