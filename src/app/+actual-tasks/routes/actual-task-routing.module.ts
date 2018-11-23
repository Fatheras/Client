import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualTaskComponent } from '../actual-task.component';
import { AuthenticationGuardService } from '../../+authentication/services/authentication-guard.service';

const actualTaskRoutes: Routes = [
  { path: 'category/:id/tasks', component: ActualTaskComponent, canActivate: [AuthenticationGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forChild(actualTaskRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class ActualTaskRoutingModule {

}
