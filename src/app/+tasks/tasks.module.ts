import { NgModule } from '@angular/core';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './routes/tasks-routing.module';

@NgModule({
  declarations: [
    AddTaskComponent,
    EditTaskComponent,
    TaskFormComponent,
  ],
  imports: [
    TasksRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class TasksModule { }
