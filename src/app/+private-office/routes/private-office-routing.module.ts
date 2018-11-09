import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateOfficeComponent } from '../private-office.component';
import { AuthenticationGuardService } from '../../+authentication/services/authentication-guard.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { UsersComponent } from '../components/users/users.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { RoleGuardService } from '../../../app/+authentication/services/role-guard.service';


const privateOfficeRoutes: Routes = [
  {
    path: '', component: PrivateOfficeComponent, canActivate: [AuthenticationGuardService],
    children: [
      { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuardService] },
      {
        path: 'users', component: UsersComponent, canActivate: [AuthenticationGuardService, RoleGuardService],
        data: {
          expectedRole: '3'
        },
      },
      { path: 'tasks', component: TasksComponent, canActivate: [AuthenticationGuardService] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(privateOfficeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PrivateOfficeRoutingModule {

}
