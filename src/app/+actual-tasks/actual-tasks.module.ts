import { NgModule } from '@angular/core';
import { ActualTaskRoutingModule } from './routes/actual-task-routing.module';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActualTaskComponent } from './actual-task.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryComponent } from './components/category/category/category.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { WarnDialogComponent } from '../dialogs/warn-dialog/warn-dialog.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  entryComponents: [
    WarnDialogComponent
    ],
  declarations: [
    WarnDialogComponent,
    TaskComponent,
    CategoryComponent,
    TaskListComponent,
    ActualTaskComponent,
    CategoryListComponent,
  ],
  imports: [
    NgxMaterialTimepickerModule.forRoot(),
    InfiniteScrollModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ActualTaskRoutingModule,
  ],
  exports: [
    ActualTaskComponent,
    CategoryListComponent,
  ]
})
export class ActualTaskModule { }
