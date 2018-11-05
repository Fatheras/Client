import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from './+authentication/services/authentication-guard.service';
import { ErrorComponent } from './error/components/error.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/registration' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
