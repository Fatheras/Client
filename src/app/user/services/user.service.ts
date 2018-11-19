import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from '../models/User';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    private url: string = environment.url;

    constructor(private http: HttpClient) { }

    public getUser(): Observable<IUser> {
        return this.http.get<IUser>(this.url + '/users/me');
    }

    public updateUser(user: IUser, password, newPassword): Observable<IUser> {
        return this.http.put<IUser>(this.url + `/users/${user.id}`,
            {
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
                password,
                newPassword
            });
    }

    public updateUserRole(userId: number, role): Observable<IUser> {
        return this.http.put<IUser>(this.url + `/users/${userId}/changeRole`,
            {
                role
            });
    }

    public getAllUsersWithStatistic(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url + '/users/statistic');
    }

    public getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url + '/users');
    }
}
