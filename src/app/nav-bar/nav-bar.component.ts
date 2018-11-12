import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../+authentication/services/authentication.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    constructor(public route: Router, private authService: AuthenticationService) {}

    public moveToAddTask() {
        this.route.navigate(['tasks', 'add']);
    }

    public moveToProfile() {
        this.route.navigate(['/profile']);
    }

    public moveToTasks() {
        this.route.navigate(['category/all/tasks']);
    }

    public logOut() {
        this.authService.logOut();
    }
}
