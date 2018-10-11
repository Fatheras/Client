import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from 'src/app/user/user';
import { AuthenticationService } from '../../services/authentication.service';
import { MyErrorStateMatcher } from '../../models/errors/error.matcher';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {

  constructor(private router: Router, private authService: AuthenticationService) {

  }

  public authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });

  public matcher = new MyErrorStateMatcher();

  public signUp() {
    this.router.navigate([`/registration`]);
  }

  public signIn() {
    let user: IUser;

    user = {
      email: this.authForm.controls['email'].value,
      password: this.authForm.controls['password'].value
    };

    this.authService.logIn(user);
  }
}
