import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from '../../user/models/User';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { RoleService } from './role.service';

@Injectable()
export class AuthenticationService {
    private url: string = environment.url;

    constructor(
        private http: HttpClient,
        public jwtHelper: JwtHelperService,
        private router: Router,
        private tokenService: TokenService,
        private roleService: RoleService
    ) { }

    public signUp(user: IUser) {
        return this.http.post<IUser>(`${this.url}/users/signup`, user);
    }

    public logIn(email: string, password: string) {
        return this.http.post<any>(`${this.url}/users/login`, { email, password }).pipe(
            tap((data) => {
                this.tokenService.Token = data.token;
                this.roleService.Role = data.role;
                this.router.navigate(['category', 'all', 'tasks']);
            })
        );
    }

    public logOut() {
        localStorage.clear();
        this.router.navigate(['authorization']);
    }

    public isAuthenticated(): boolean {
        const token = this.tokenService.Token;

        return !this.jwtHelper.isTokenExpired(token);
    }
}
