import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../components/error.component';

const errorRoutes: Routes = [
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(errorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ErrorRoutingModule { }
