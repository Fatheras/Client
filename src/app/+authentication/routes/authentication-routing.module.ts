import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../components/registration/registration.component';
import { AuthorizationComponent } from '../components/authorization/authorization.component';
import { ErrorComponent } from '../../error/components/error.component';
import { AuthenticationGuardService } from '../services/authentication-guard.service';
import { LoggedGuardService } from '../services/logged-guard.service';


const authRoutes: Routes = [
    { path: 'registration', component: RegistrationComponent, canActivate: [LoggedGuardService] },
    { path: 'authorization', component: AuthorizationComponent, canActivate: [LoggedGuardService]},
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule {

}
