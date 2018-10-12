import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeComponent } from '../components/me.component';
import { AuthenticationGuardService } from '../../+authentication/services/authentication-guard.service';



const meRoutes: Routes = [
    { path: 'me', component: MeComponent, canActivate: [AuthenticationGuardService]}
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(meRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MeRoutingModule {

}
