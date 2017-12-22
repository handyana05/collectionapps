import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { PasswordValidation } from '../core/validation/PasswordValidation';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginRegisterErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  firstNameFormControl: FormControl;

  lastNameFormControl: FormControl;

  userNameFormControl: FormControl;

  emailFormControl: FormControl;

  passwordFormControl: FormControl;

  passwordConfirmFormControl: FormControl;

  matcher: LoginRegisterErrorStateMatcher = new LoginRegisterErrorStateMatcher();

  constructor(fb: FormBuilder) {
    this.initFormControls();
    this.initRegisterForm(fb);
    this.initLoginForm(fb);
  }

  ngOnInit() {
  }

  initFormControls(): void {
    this.firstNameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);

    this.lastNameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);

    this.userNameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);

    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.passwordFormControl = new FormControl('', [
      Validators.required
    ]);

    this.passwordConfirmFormControl = new FormControl('', [
      Validators.required
    ]);
  }

  initRegisterForm(fb: FormBuilder): void {

    this.registerForm = fb.group({
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      username: this.userNameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
      passwordConfirm:  this.passwordConfirmFormControl
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  initLoginForm(fb: FormBuilder): void {
    this.loginForm = fb.group({
      username: this.userNameFormControl,
      password: this.passwordFormControl
    });
  }

  register(): void {

  }

  registerFormReset(): void {
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.registerForm.updateValueAndValidity();
  }

  login(): void {

  }

  loginFormReset(): void {
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.updateValueAndValidity();
  }
}
