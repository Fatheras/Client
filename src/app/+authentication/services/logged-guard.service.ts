import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LoggedGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) { }

  public canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['category/all/tasks']);
      return false;
    }

    return true;
  }
}
