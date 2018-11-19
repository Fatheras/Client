import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from '../models/User';
import { Observable } from 'rxjs';

@Injectable()
export class ManagerService {
    private url: string = environment.url;

    constructor(private http: HttpClient) { }

    public getAllManagers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url + '/users/managers');
    }
}
