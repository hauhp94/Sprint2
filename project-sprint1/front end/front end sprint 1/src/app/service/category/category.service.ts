import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model/category/category";
import {TokenStorageService} from "../account/token-storage.service";

const CATEGORY_API = 'http://localhost:8080/api/category/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //Creator: Tra
  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  findById(id: number): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(CATEGORY_API + id,this.httpOptions);
  }

  edit(category: Category): Observable<HttpEvent<any>> {
    return this.httpClient.patch<any>(CATEGORY_API + "edit", category,this.httpOptions);
  }

  addMoney(category: Category, moneyBuyHour: any): Observable<HttpEvent<any>> {
    // @ts-ignore
    return this.httpClient.patch<any>(CATEGORY_API + "addMoneyToAccount/"+moneyBuyHour, category, this.httpOptions);
  }
}
