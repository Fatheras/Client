import { Component, OnInit, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './+authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  public isLoggedIn: boolean;

  constructor(public http: HttpClient, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
}
