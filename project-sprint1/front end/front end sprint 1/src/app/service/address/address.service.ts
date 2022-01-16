
import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address} from '../../model/address/address';
import {Province} from '../../model/address/province';
import {District} from '../../model/address/district';
import {Commune} from '../../model/address/commune';
import {TokenStorageService} from '../account/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private API_URL = 'http://localhost:8080/address';
  private API_URL_PROVINCE = 'http://localhost:8080/province';
  private API_URL_DISTRICT = 'http://localhost:8080/district';
  private API_URL_COMMUNE = 'http://localhost:8080/commune';

  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAddressList(): Observable<HttpEvent<any>>{
    return this.httpClient.get<any>(this.API_URL, this.httpOptions);
  }

  getProvinceList(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL_PROVINCE, this.httpOptions);
  }

  getDistrictList(id: number): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL_DISTRICT + '/' + id, this.httpOptions);
  }

  getCommuneList(id: number): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL_COMMUNE + '/' + id, this.httpOptions);
  }
}
