import { NgModule } from '@angular/core';
import { PrivateOfficeComponent } from './private-office.component';
import { PrivateOfficeRoutingModule } from './routes/private-office-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from '../user/components/user-list/user-list.component';
import { UserComponent } from '../user/components/user/user.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TaskComponent } from './components/tasks/components/task/task.component';
import { TaskListComponent } from './components/tasks/components/task-list/task-list.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NewTasksComponent } from './components/new-tasks/new-tasks.component';
import { SearchComponent } from '../search/search.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';

@NgModule({
  declarations: [
    AllTasksComponent,
    SearchComponent,
    NewTasksComponent,
    CategoriesComponent,
    TaskComponent,
    TaskListComponent,
    TasksComponent,
    PrivateOfficeComponent,
    ProfileComponent,
    UsersComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    InfiniteScrollModule,
    ReactiveFormsModule,
    PrivateOfficeRoutingModule,
    MaterialModule,
    CommonModule,
  ],
})
export class PrivateOfficeModule { }
