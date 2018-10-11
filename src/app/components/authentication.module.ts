import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './routes/authentication-routing.module';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    RegistrationComponent,
    AuthorizationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MaterialModule
  ]
})
export class AuthenticationModule { }
