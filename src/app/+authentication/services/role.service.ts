import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RoleService {
    constructor(public router: Router) { }

    public get Role() {
        return +localStorage.getItem('role');
    }

    public set Role(role: number) {
        localStorage.setItem('role', role.toString());
    }
}
