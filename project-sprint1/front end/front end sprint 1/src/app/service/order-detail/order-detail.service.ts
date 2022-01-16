import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDetail} from "../../model/order-detail/order-detail";
import {TokenStorageService} from "../account/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private API = 'http://localhost:8080/order_detail';

  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
// huynh code
  getAllOderDetailByIdOder(idOder: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/' + idOder,this.httpOptions);
  }

  createOrderDetail(orderDetail: OrderDetail[], id: number): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.API + '/create_detail/' + id, {orderDetailDtoList: orderDetail},this.httpOptions);
  }

}
