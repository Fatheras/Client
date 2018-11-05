import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class TokenService {
    constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) { }

    public removeToken() {
        localStorage.clear();
        this.router.navigate(['authorization']);
    }

    public getToken(): string {
        return this.jwtHelper.tokenGetter();
    }

    public setToken(token) {
        localStorage.setItem('token', token);
    }
}
