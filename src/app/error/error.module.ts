import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorComponent } from './components/error.component';
import { ErrorRoutingModule } from './routes/error-routing.module';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ErrorRoutingModule,
  ],
})
export class ErrorModule { }
