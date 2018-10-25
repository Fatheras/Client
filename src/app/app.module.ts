import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './+authentication/modules/authentication.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './+authentication/services/authentication.service';
import { MeModule } from './+me/modules/me.module';
import { AuthenticationGuardService } from './+authentication/services/authentication-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/+authentication/models/token.interceptor';
import { MaterialModule } from './material/material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ActualTaskModule } from './+actual-tasks/actual-tasks.module';
import { CategoryService } from './+actual-tasks/services/category.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    MeModule,
    MaterialModule,
    ActualTaskModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      }
    }),
  ],
  providers: [AuthenticationService, AuthenticationGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
