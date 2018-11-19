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

    public moveToAddTask(): void {
        this.route.navigate(['tasks', 'add']);
    }

    public moveToProfile(): void {
        this.route.navigate(['/profile']);
    }

    public moveToTasks(): void {
        this.route.navigate(['category/all/tasks']);
    }

    public logOut(): void {
        this.authService.logOut();
    }
}
