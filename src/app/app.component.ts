import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public checkUrl() {
    return !(/\/registration/.test(location.href) || /\/authorization/.test(location.href));
  }

  constructor(public http: HttpClient, private router: Router) { }
  public ping() {
    this.http.get('https://example.com/api/things')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}
