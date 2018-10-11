import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../components/registration/registration.component';
import { AuthorizationComponent } from '../components/authorization/authorization.component';


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
