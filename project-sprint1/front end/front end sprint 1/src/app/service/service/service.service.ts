import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Unit} from '../../model/service/unit';
import {Services} from '../../model/service/services';
import {TokenStorageService} from "../account/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private API = 'http://localhost:8080';

  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  //phap
  getAllServices(name: string, page: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/services?name=' + name + '&page=' + page,this.httpOptions);
  }

  //phap
  searchNameCode(code: string, name: string, prices: string, page: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/services/searchNameCodePrices?code=' + code + '&name=' + name,this.httpOptions);

  }
// Khanh code
  getAllUnit(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API + '/units',this.httpOptions);
  }

  deleteServices(id: number) {
    // @ts-ignore
    return this.httpClient.patch<>(this.API + '/services/delete/' + id,this.httpOptions);
  }
// Khanh code
  findById(id: number): Observable<HttpEvent<any>>{
    return this.httpClient.get<any>(this.API + '/services' + '/' + id,this.httpOptions);
  }

  update(id: number, service: Services): Observable<HttpEvent<any>> {
    return this.httpClient.patch<any>(this.API + '/services' + '/' + id, service,this.httpOptions);
  }

  create(service: Services): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.API + '/services' + '/create', service,this.httpOptions);
  }

//huỳnh code
  getListServices(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API + '/services/listAllServices',this.httpOptions);
  }

  updateQuantity(id: number, quantity: number): Observable<HttpEvent<any>> {
    return this.httpClient.patch<any>(this.API + '/services/setQuantity/'  + id, quantity,this.httpOptions);
  }
}
