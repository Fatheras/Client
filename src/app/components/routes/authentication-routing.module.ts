import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthorizationComponent } from '../authorization/authorization.component';


const authRoutes: Routes = [
    { path: 'registration', component: RegistrationComponent},
    { path: 'authorization', component: AuthorizationComponent},
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
