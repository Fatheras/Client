import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from '../../user/user';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    private url: string = environment.url;

    cachedRequests: Array<HttpRequest<any>> = [];

    constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) { }

    public signUp(user: IUser) {
        return this.http.post<IUser>(`${this.url}/users/signup`, user);
    }

    public logIn(email: string, password: string) {
        return this.http.post<string>(`${this.url}/users/login`, { email, password }).pipe(
            tap((token) => {
                this.setToken(token);
                this.router.navigate(['/me']);
            })
        );
    }

    public getToken(): string {
        return this.jwtHelper.tokenGetter();
    }

    public setToken(token) {
        localStorage.setItem('token', token);
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        return !this.jwtHelper.isTokenExpired(token);
    }

}
