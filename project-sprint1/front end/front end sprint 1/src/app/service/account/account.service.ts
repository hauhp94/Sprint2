import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Province} from '../../model/address/province';
import {Account} from '../../model/account/account';
import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';
import {map} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';
// creator: vinhdn
const API_URL = 'http://localhost:8080/account';
const API_URL_ACCOUNT = 'http://localhost:8080/account/{username}';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + this.tokenStorage.getToken()
      })
      ,
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  // creator: vinhdn
  getAccountList(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(API_URL + '/list', this.httpOptions);
  }


// vu
  getAccountByUserName(username: string): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(API_URL_ACCOUNT + username, this.httpOptions);
  };

  // vu code
  getPass(username: string, password: string): Observable<boolean> {
    return this.httpClient.post<boolean>(API_URL + '/getPass/' + username + '/' + password, this.httpOptions);
  }

  // vu code
  setNewPassword(username: string, newPassword: string): Observable<void> {
    return this.httpClient.post<void>(API_URL + '/setPass/' + username + '/' + newPassword, this.httpOptions);
  }
}
