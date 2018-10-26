import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { IUser } from 'src/app/user/user';
import { AuthenticationService } from '../../services/authentication.service';
import { MyErrorStateMatcher } from '../../models/errors/error.matcher';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private router: Router, private authService: AuthenticationService, private fb: FormBuilder) {

  }

  public matcher = new MyErrorStateMatcher();

  public registForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    passwords: this.fb.group({
      password: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      repeat: new FormControl('', [Validators.required, Validators.maxLength(255)])
    }, { validator: this.matcher.equalValueValidator('password', 'repeat') }),
    phone: new FormControl('', [Validators.required, Validators.maxLength(255)])
  });

  public  signUp() {

    let user: IUser;

    user = {
      email: this.registForm.controls['email'].value,
      password: this.registForm.value.passwords.password,
      phone: this.registForm.controls['phone'].value
    };

    this.authService.signUp(user.email, user.password, user.phone).subscribe((data) => {
      this.authService.logIn(user.email, user.password).subscribe((token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/me']);
      });
    });
  }

  public signIn() {
    this.router.navigate([`/authorization`]);
  }

}
