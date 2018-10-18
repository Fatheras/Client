import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MeRoutingModule } from '../routes/me-routing.module';
import { MeComponent } from '../components/me.component';


@NgModule({
  declarations: [
    MeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MeRoutingModule,
    MaterialModule
  ],
})
export class MeModule { }
