import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { RoleService } from './role.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public auth: AuthenticationService,
    public router: Router,
    public roleService: RoleService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (expectedRole instanceof Array) {
      return !!expectedRole.find((role, i, arr) => this.roleService.Role === role);
    }
    return this.roleService.Role === expectedRole;
  }
}
