import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './+authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './+authentication/services/authentication.service';
import { AuthenticationGuardService } from './+authentication/services/authentication-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../app/+authentication/models/token.interceptor';
import { MaterialModule } from './material/material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ActualTaskModule } from './+actual-tasks/actual-tasks.module';
import { CategoryService } from './services/category.service';
import { DealService } from './services/deal-service';
import { ErrorModule } from './error/error.module';
import { LoggedGuardService } from './+authentication/services/logged-guard.service';
import { TokenService } from './+authentication/services/token.service';
import { PrivateOfficeModule } from './+private-office/private-office.module';
import { UserService } from './user/services/user.service';
import { RoleGuardService } from './+authentication/services/role-guard.service';
import { RoleService } from './+authentication/services/role.service';
import { TasksModule } from './+tasks/tasks.module';
import { CategoryResolver } from './services/category-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    TasksModule,
    PrivateOfficeModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    ActualTaskModule,
    ErrorModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      }
    }),
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuardService,
    CategoryService,
    DealService,
    LoggedGuardService,
    RoleGuardService,
    UserService,
    RoleService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    CategoryService,
    DealService,
    CategoryResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
