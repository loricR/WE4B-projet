import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DeveloperComponent } from 'src/app/developer/developer.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  dev: boolean = false;
  
  user: User = new User(); // Instanciez un nouvel utilisateur

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.dev = this.tokenStorage.getUser().dev; //If the user is a developer
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe(
      res => {                //res has the result data of the SQL query
        this.tokenStorage.saveToken(res.data[0].accessToken); //Save the JWT
        delete res.data[0]['accessToken'];  //Don't save the token inside the user data
        this.tokenStorage.saveUser(res.data[0]);  //Save the data of the new logged user

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.dev = this.tokenStorage.getUser().dev;
        this.reloadPageHome();
      }
    )
  }

  reloadPageHome(): void {
    /*this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/']));*/
    window.location.reload();
  }
}
