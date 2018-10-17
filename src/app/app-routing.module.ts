import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualTaskComponent } from './+actual-tasks/actual-task.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/me', pathMatch: 'full' },
  { path: 'category', redirectTo: '/category/all', pathMatch: 'full' },
  { path: 'category/all', pathMatch: 'full', component: ActualTaskComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
