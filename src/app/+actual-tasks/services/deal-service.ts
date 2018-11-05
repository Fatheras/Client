import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITask } from '../models/Task';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DealService {
    private url = `${environment.url}`;

    constructor(private http: HttpClient) {
    }

    addDeal(token, taskId) {
        return this.http.post(this.url + '/deals', {token, taskId});
    }
}
