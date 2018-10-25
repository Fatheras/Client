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

    getAllTasks(category?: number): Observable<ITask[]> {
        const params = new HttpParams()
            .set('category', category + '');

        if (+category) {
            return this.http.get<ITask[]>(this.url + '/tasks', { params });
        } else {
            return this.http.get<ITask[]>(this.url + '/tasks');
        }
    }
}