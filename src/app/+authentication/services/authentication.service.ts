import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from '../../user/user';

@Injectable()
export class AuthenticationService {

    private url: string = environment.url;

    cachedRequests: Array<HttpRequest<any>> = [];

    constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {

    }

    public signUp(email: string, password: string, phone: string) {
        return this.http.post<void>(`${this.url}/users/signup`, {email, password, phone});
    }

    public logIn(email: string, password: string) {
        return this.http.post<string>(`${this.url}/users/login`, { email, password });
    }

    public getToken(): string {
        return this.jwtHelper.tokenGetter();
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        return !this.jwtHelper.isTokenExpired(token);
    }

}
