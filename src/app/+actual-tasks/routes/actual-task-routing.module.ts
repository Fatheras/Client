import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../components/task/task-list/task-list.component';
import { TaskComponent } from '../components/task/task/task.component';
import { CategoryListComponent } from '../components/category/category-list/category-list.component';

const actualTaskRoutes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'task', component: TaskComponent },
  { path: 'category-list', component: CategoryListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(actualTaskRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActualTaskRoutingModule {

}
