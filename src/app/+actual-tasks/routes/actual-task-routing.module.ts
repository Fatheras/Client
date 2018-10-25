import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../components/task/task-list/task-list.component';
import { ActualTaskComponent } from '../actual-task.component';

const actualTaskRoutes: Routes = [
  // { path: 'category/all/tasks', component: ActualTaskComponent },
  { path: 'category/:id/tasks', component: ActualTaskComponent },
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
