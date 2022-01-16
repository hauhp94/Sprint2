import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PayPalLink} from "../../model/paypal/PayPalLink";
import {TokenStorageService} from "../account/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API_URL_PAYMENT = 'http://localhost:8080/pay';
  private API_URL_SUCCESS = 'http://localhost:8080/success';

  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  payment(price: number): Observable<HttpEvent<PayPalLink>> {
    return this.httpClient.get<PayPalLink>(this.API_URL_PAYMENT+'?price='+price,this.httpOptions);
  }

  successPayment(paymentId: string,PayerID: string): Observable<any>{
    return this.httpClient.get<any>(this.API_URL_SUCCESS+'?paymentId='+paymentId+'&PayerID='+PayerID,this.httpOptions)
  }
}
