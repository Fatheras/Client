import { NgModule } from '@angular/core';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './routes/authentication-routing.module';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    RegistrationComponent,
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MaterialModule
  ],
})
export class AuthenticationModule { }
