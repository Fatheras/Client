import { NgModule } from '@angular/core';
import { TaskComponent } from './components/task/task/task.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { ActualTaskRoutingModule } from './routes/actual-task-routing.module';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActualTaskComponent } from './actual-task.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryComponent } from './components/category/category/category.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    TaskComponent,
    CategoryComponent,
    TaskListComponent,
    ActualTaskComponent,
    CategoryListComponent
  ],
  imports: [
    InfiniteScrollModule,
    BrowserModule,
    CommonModule,
    MaterialModule,
    ActualTaskRoutingModule,
  ],
  exports: [
    TaskComponent,
    TaskListComponent,
    ActualTaskComponent,
    CategoryListComponent
  ]

})
export class ActualTaskModule { }
