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
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { WarnDialogComponent } from './components/task/warn-dialog/warn-dialog.component';

@NgModule({
  entryComponents: [
    WarnDialogComponent
    ],
  declarations: [
    WarnDialogComponent,
    AddTaskComponent,
    TaskComponent,
    CategoryComponent,
    TaskListComponent,
    ActualTaskComponent,
    CategoryListComponent,
  ],
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule.forRoot(),
    InfiniteScrollModule,
    BrowserModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ActualTaskRoutingModule,
  ],
  exports: [
    TaskComponent,
    TaskListComponent,
    ActualTaskComponent,
    CategoryListComponent,
  ]
})
export class ActualTaskModule { }
