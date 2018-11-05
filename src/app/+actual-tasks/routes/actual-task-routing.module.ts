import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../components/task/task-list/task-list.component';
import { ActualTaskComponent } from '../actual-task.component';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { AuthenticationGuardService } from '../../+authentication/services/authentication-guard.service';

const actualTaskRoutes: Routes = [
  // { path: 'category/all/tasks', component: ActualTaskComponent },
  { path: 'category/:id/tasks', component: ActualTaskComponent, canActivate: [AuthenticationGuardService] },
  { path: 'tasks/add', component: AddTaskComponent, canActivate: [AuthenticationGuardService] }
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
