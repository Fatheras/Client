import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { IUser } from '../../../user/models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { MyErrorStateMatcher } from '../../../models/errors/error.matcher';
import { switchMap, tap } from 'rxjs/operators';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  public matcher = new MyErrorStateMatcher();

  public registForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    passwords: this.fb.group({
      password: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      repeat: new FormControl('', [Validators.required, Validators.maxLength(255)])
    }, { validator: this.matcher.equalValueValidator('password', 'repeat') }),
    phone: new FormControl('', [Validators.required, Validators.maxLength(255)])
  });

  constructor(private router: Router, private authService: AuthenticationService, private fb: FormBuilder) {

  }

  public signUp() {

    let user: IUser;

    user = {
      email: this.registForm.controls['email'].value,
      password: this.registForm.value.passwords.password,
      phone: this.registForm.controls['phone'].value
    };

    this.authService.signUp(user)
      .pipe(
        switchMap(
          () => this.authService.logIn(user.email, user.password),
        )
      )
      .subscribe(
        () => {},
        (error) => {
          this.registForm.setErrors({
            'badRequest': true,
          });
        }
      );
  }

  public signIn() {
  this.router.navigate([`/authorization`]);
}

}
