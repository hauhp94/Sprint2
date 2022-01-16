
import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gender} from '../../model/customer/gender';
import {TokenStorageService} from "../account/token-storage.service";

// creator: vinhdn
const API_URL_COMMUNE = 'http://localhost:8080/gender';


@Injectable({
  providedIn: 'root'
})
export class GenderService {
  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  // creator: vinhdn
  getGenderList(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(API_URL_COMMUNE,this.httpOptions);
  }
}
