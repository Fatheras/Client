import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITask } from '../models/Task';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from '../../+authentication/services/token.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private url = `${environment.url}`;

    constructor(private http: HttpClient, private tokenService: TokenService) {
    }

    getAllTasks(category?: number, lastSeen?, batchSize?): Observable<ITask[]> {
        let params = new HttpParams()
            .set('offset', lastSeen + '')
            .set('limit', batchSize + '')
            .set('token', this.tokenService.getToken());
        if (category) {
            params = params.set('category', category + '');
        }

        return this.http.get<ITask[]>(this.url + '/tasks', { params });
    }

    addTask(task: ITask) {
        return this.http.post<ITask>(this.url + '/tasks', Object.assign(task, {
            token: this.tokenService.getToken(),
        }));
    }
}
