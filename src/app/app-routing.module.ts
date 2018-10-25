import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from './+authentication/services/authentication-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/me', pathMatch: 'full',  canActivate: [AuthenticationGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
