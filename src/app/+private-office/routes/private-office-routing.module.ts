import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateOfficeComponent } from '../private-office.component';
import { AuthenticationGuardService } from '../../+authentication/services/authentication-guard.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { UsersComponent } from '../components/users/users.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { RoleGuardService } from '../../../app/+authentication/services/role-guard.service';
import { CategoriesComponent } from '../components/categories/categories.component';
import { NewTasksComponent } from '../components/new-tasks/new-tasks.component';
import { Role } from '../../models/Role';
import { AllTasksComponent } from '../components/all-tasks/all-tasks.component';
import { CategoryResolver } from '../../services/category-resolver.service';


const privateOfficeRoutes: Routes = [
  {
    path: '', component: PrivateOfficeComponent, canActivate: [AuthenticationGuardService],
    // resolve: { categories: CategoryResolver },
    children: [
      { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuardService] },
      {
        path: 'users', component: UsersComponent, canActivate: [AuthenticationGuardService, RoleGuardService],
        data: {
          expectedRole: Role.Admin
        },
      },
      { path: 'tasks', component: TasksComponent, canActivate: [AuthenticationGuardService] },
      {
        path: 'categories', component: CategoriesComponent, canActivate: [AuthenticationGuardService, RoleGuardService],
        data: {
          expectedRole: Role.Admin
        },
      },
      {
        path: 'new-tasks', component: NewTasksComponent, canActivate: [AuthenticationGuardService, RoleGuardService],
        data: {
          expectedRole: [Role.Admin, Role.Manager]
        },
      },
      {
        path: 'all-tasks', component: AllTasksComponent, canActivate: [AuthenticationGuardService, RoleGuardService],
        data: {
          expectedRole: Role.Admin
        },
      },
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
