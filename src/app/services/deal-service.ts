import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DealService {
    private url = `${environment.url}`;

    constructor(private http: HttpClient) {
    }

    public addDeal(token, taskId) {
        return this.http.post(this.url + '/deals', {token, taskId});
    }
}
