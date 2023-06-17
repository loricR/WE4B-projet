import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DeveloperComponent } from 'src/app/developer/developer.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessRegister = false;
  isSignupFailed = false;
  dev: boolean = false;

  loginForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
  );

  registerForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      developer: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    }
  , { validators: [this.passwordMatchValidator]});

  submitted = false;

  
  user: User = new User(); // Instanciez un nouvel utilisateur

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    console.log("DEV",this.registerForm.get('developer')?.value);
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.dev = this.tokenStorage.getUser().dev; //If the user is a developer
    }
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({'passwordMismatch': true});
      return { 'passwordMismatch': true };
    }
    else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  onSubmitLogin(): void {
    //const {username, password} = this.form;
    const username = this.loginForm.get('username');
    const password = this.loginForm.get('password');

    if(username?.value && password?.value) {
    this.authService.login(username.value, password.value).subscribe(
      res => {                //res has the result data of the SQL query
        if(res.data) {
          this.tokenStorage.saveToken(res.data[0].accessToken); //Save the JWT
          delete res.data[0]['accessToken'];  //Don't save the token inside the user data
          this.tokenStorage.saveUser(res.data[0]);  //Save the data of the new logged user

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.dev = this.tokenStorage.getUser().dev;
          this.reloadPageHome();
        }
        else {
          this.isLoginFailed = true;  //To show to the user it doesn't work
        }
      }
    )
    }
    else {
      this.isLoginFailed = true;
    }
  }

  onSubmitRegister() {
    this.submitted = true;

    const username = this.registerForm.get('username');
    let userExist = false;

    if(username?.value) {
      this.authService.verifyUsername(username.value).subscribe(
        res => {                //res has the result data of the SQL query
          if(res.data) {
            userExist = true;
            username.setErrors({userExist: true});
          }
          else {
            userExist = false;
            username.setErrors(null);
          }

          // stop here if form is invalid
          if (this.registerForm.invalid || username?.getError('userExist')) {
              return;
          }

          // send the value in the db and get user token and data to store in cookies
          this.authService.register(this.registerForm.value).subscribe(
            resRegister => {
              if(!resRegister.data) {
                this.isSignupFailed = true;
              } else {
                this.isSuccessRegister = true;

                this.tokenStorage.saveToken(resRegister.data[0].accessToken); //Save the JWT
                delete resRegister.data[0]['accessToken'];  //Don't save the token inside the user data
                this.tokenStorage.saveUser(resRegister.data[0]);  //Save the data of the new logged user

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.dev = this.tokenStorage.getUser().dev;
                this.reloadPageHome();
              }
            }
          )
        }
      )
    }
  }

  reloadPageHome(): void {
    /*this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/']));*/
    window.location.reload();
  }
}
