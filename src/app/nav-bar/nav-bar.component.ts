import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../+authentication/services/authentication.service';
import { TokenService } from '../+authentication/services/token.service';



@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    constructor(public route: Router, private tokenService: TokenService) {}

    public moveToAddTask() {
        this.route.navigate(['tasks', 'add']);
    }

    public logOut() {
        this.tokenService.removeToken();
    }
}
