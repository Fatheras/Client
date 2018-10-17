import { NgModule } from '@angular/core';
import { TaskComponent } from '../components/task/task/task.component';
import { TaskListComponent } from '../components/task/task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { } from '../routes/actual-task-routing.module';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ActualTaskComponent } from '../actual-task.component';
import { CategoryListComponent } from '../components/category/category-list/category-list.component';


@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    ActualTaskComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    TaskComponent,
    TaskListComponent,
    ActualTaskComponent,
    CategoryListComponent
  ]

})
export class ActualTaskModule { }
