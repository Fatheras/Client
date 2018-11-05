import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './+authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  public isLoggedIn;

  constructor(public http: HttpClient, private router: Router, private authService: AuthenticationService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
}
