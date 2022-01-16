import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ACCOUNT_API = 'http://localhost:8080/account/setPass';
  AUTH_API = 'http://localhost:8080/api/auth/';
  httpOptions: any;

  constructor(public http: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(user): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    }, this.httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, this.httpOptions);
  }

  changPassWord(username: string, newPassWord: string){
    return this.http.get<any>(this.ACCOUNT_API + '?username=' + username + '&&newPassword=' + newPassWord);
  }

  logout(employeeId) {
    return this.http.patch<any>(this.AUTH_API + 'singout/' + employeeId , this.httpOptions);
  }

}
