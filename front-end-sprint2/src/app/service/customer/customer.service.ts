import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gender} from '../../model/gender/gender';
import {Customer} from '../../model/customer/customer';
const API_CUSTOMER = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  API_URL = 'http://localhost:8080/customer';
  private API_URL_CUSTOMER = 'http://localhost:8080/customer';
  private API_URL_GENDER = 'http://localhost:8080/customer/gender';

  httpOptions: any;

  constructor(public httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getCustomerList(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/list' + '?page=' + page, this.httpOptions);
  }

  searchCustomerList(page: number, customerCode: any): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/search' + '?page=' + page + '&customerCode=' + customerCode, this.httpOptions);
  }

  searchKeyCustomerList(page: number, keySearch: any): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/searchKey' + '?page=' + page + '&keySearch=' + keySearch, this.httpOptions);
  }

  deleteCustomerById(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.API_URL + '/delete/' + id, this.httpOptions);
  }

  getAllGender() {
    return this.httpClient.get<Gender[]>(this.API_URL_GENDER);
  }

  saveCustomer(customer) {
    console.log(this.API_URL_CUSTOMER, customer);
    return this.httpClient.post<Customer>(this.API_URL_CUSTOMER, customer);
  }

  editCustomer(customer) {
    return this.httpClient.patch<Customer>(this.API_URL_CUSTOMER, customer);
  }

  findById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.API_URL_CUSTOMER + '/' + id);
  }

  // Linh code
  getCustomerListLinh(page: number): Observable<any> {
    return this.httpClient.get<any>(API_CUSTOMER + '?page=' + page);
  }

  // Linh code
  findByIdLinh(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(API_CUSTOMER + '/' + id);
  }

  // Linh code
  searchToCreateContract(page: number, keyword: string): Observable<any> {
    return this.httpClient.get<any>(API_CUSTOMER + '/searchToCreateContract' + '?page=' + page + '&keyword=' + keyword);
  }
}
