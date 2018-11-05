import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from '../../user/user';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationService {

    private url: string = environment.url;

    constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router
        , private tokenService: TokenService) { }

    public signUp(user: IUser) {
        return this.http.post<IUser>(`${this.url}/users/signup`, user);
    }

    public logIn(email: string, password: string) {
        return this.http.post<string>(`${this.url}/users/login`, { email, password }).pipe(
            tap((token) => {
                this.tokenService.setToken(token);
                this.router.navigate(['category', 'all', 'tasks']);
            })
        );
    }

    public isAuthenticated(): boolean {
        const token = this.tokenService.getToken();

        return !this.jwtHelper.isTokenExpired(token);
    }

}
