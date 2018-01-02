import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTabChangeEvent } from "@angular/material";

import { PasswordValidation } from '../core/validation/PasswordValidation';

import { UserService } from '../core/services/user/user.service';
import { Register } from '../core/models/register';
import { Login } from '../core/models/login';

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
  @ViewChild('tabGroup') tabGroup;

  loginForm: FormGroup;
  registerForm: FormGroup;

  firstnameFormControl: FormControl;

  lastnameFormControl: FormControl;

  usernameFormControl: FormControl;

  emailFormControl: FormControl;

  passwordFormControl: FormControl;

  passwordconfirmFormControl: FormControl;

  matcher: LoginRegisterErrorStateMatcher = new LoginRegisterErrorStateMatcher();

  registerModel: Register;
  loginModel: Login;

  errors: any = {};
  loading: Boolean = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private fb: FormBuilder, private userService: UserService) {
    this.initFormControls(this.fb);
    this.registerModel = new Register();
    this.loginModel = new Login();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initFormControls(fb: FormBuilder): void {
    this.firstnameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);

    this.lastnameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);

    this.usernameFormControl = new FormControl('', [
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

    this.passwordconfirmFormControl = new FormControl('', [
      Validators.required
    ]);

    this.initRegisterForm(fb);
    this.initLoginForm(fb);
  }

  /*********************************************************
   * Register
   *********************************************************/
  initRegisterForm(fb: FormBuilder): void {

    this.registerForm = fb.group({
      firstname: this.firstnameFormControl,
      lastname: this.lastnameFormControl,
      username: this.usernameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
      passwordconfirm:  this.passwordconfirmFormControl
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  register(): void {
    if(this.registerForm.invalid) {
      this.invokeRegisterFormValidation();
    }
    else {
      this.loading = true;
      this.userService.register(this.registerModel).subscribe(data => {
        this.loading = false;
        if(data.errors) {
          for(var error of data.errors) {
            this.registerForm.controls[error.param].setErrors({ Server: error.msg });
          }
        }
        console.log('success');
        console.log(data);
      }, error => {
        console.log('errors!');
        console.log(error);
        this.loading = false;
      });
    }
  }

  private invokeRegisterFormValidation(): void {
    this.invokeFormValidation(this.registerForm);
  }

  registerFormReset(): void {
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.registerForm.updateValueAndValidity();

    Object.keys(this.registerModel).forEach( key => {
      this.registerModel[key] = '';
    });
  }

  /*********************************************************
   * Login
   *********************************************************/
  initLoginForm(fb: FormBuilder): void {
    this.loginForm = fb.group({
      username: this.usernameFormControl,
      password: this.passwordFormControl
    });
  }

  login(): void {
    if(this.loginForm.invalid) {
      this.invokeLoginFormValidation();
    }
    else {
      this.loading = true;
      console.log(this.loginModel);
      this.userService.login(this.loginModel).subscribe(data => {
        this.loading = false;
        if(data.errors) {
          for(var error of data.errors) {
            this.loginForm.controls[error.param].setErrors({ Server: error.msg });
          }
        }
        else if(data.success) {
          this.router.navigate([this.returnUrl]);
        }
      }, error => {
        console.log('errors!');
        console.log(error);
        this.loading = false;
      });
    }
  }

  private invokeLoginFormValidation(): void {
    this.invokeFormValidation(this.loginForm);
  }

  loginFormReset(): void {
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.updateValueAndValidity();

    Object.keys(this.loginModel).forEach( key => {
      this.loginModel[key] = '';
    });
  }

  /*********************************************************
   * Others
   *********************************************************/
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('index => ', tabChangeEvent.index);
  }

  switchToRegister = (): void => {
    this.tabGroup.selectedIndex = 1;
  }

  private invokeFormValidation(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
