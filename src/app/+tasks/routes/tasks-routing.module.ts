import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { AuthenticationGuardService } from '../../+authentication/services/authentication-guard.service';
import { EditTaskComponent } from '../components/edit-task/edit-task.component';
import { CategoryResolver } from '../../services/category-resolver.service';

const tasksRoutes: Routes = [
  {
    path: 'tasks/add',
    component: AddTaskComponent,
    canActivate: [AuthenticationGuardService],
    resolve: { categories: CategoryResolver }
  },
  {
    path: 'tasks/edit/:id',
    component: EditTaskComponent,
    canActivate: [AuthenticationGuardService],
    resolve: { categories: CategoryResolver }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(tasksRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule {

}
