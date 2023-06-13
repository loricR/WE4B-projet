import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(registerForm: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      registerForm
    }, httpOptions);
  }

  verifyUsername(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'userexist', {
      username
    }, httpOptions);
  }
}
