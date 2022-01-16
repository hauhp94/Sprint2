import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Order} from "../../model/order-detail/order";
import {TokenStorageService} from "../account/token-storage.service";
import {OrderDto} from "../../model/order-detail/order-dto/order-dto";



// huynh code
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API = 'http://localhost:8080/order';

  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllOder(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/list?page=' + page,this.httpOptions);
  }

  getAllOderByIdCustomer(idCustomer: number, page: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/' + idCustomer + '?page=' + page,this.httpOptions)
  }

  confirmPayment(idOder: number): Observable<void> {
    return this.httpClient.patch<void>(this.API + '/' + idOder,this.httpOptions);
  }

  getOrderById(idOrder: number): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API + '/getOrder/' + idOrder,this.httpOptions)
  }


  createOrder(orderDto: OrderDto): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.API + '/create', orderDto,this.httpOptions);
  }
}
