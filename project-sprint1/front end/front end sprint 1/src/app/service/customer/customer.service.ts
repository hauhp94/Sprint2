import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Customer} from '../../model/customer/customer';
import {TokenStorageService} from "../account/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {CusDTO} from "../../model/dto/CusDTO";
import {CustomerDto} from "../../model/dto/customerdto";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API_URL = 'http://localhost:8080/customer';
  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ,private toast: ToastrService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  save(customer: Customer) {
    return this.httpClient.post(this.API_URL + '/signup', customer,this.httpOptions);
  }

  // creator: vinhdn
  checkUsername(account: Account) {
    return this.httpClient.post(this.API_URL + '/checkUsername', account,this.httpOptions);
  }


  getAllGender(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL + '/gender',this.httpOptions);
  }

  getAllProvince(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL + '/province',this.httpOptions);
  }

  getAllDistrict(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL + '/district',this.httpOptions);
  }

  getAllCommune(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL + '/commune',this.httpOptions);
  }

  getAllCustomerStatus(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL + '/customerStatus',this.httpOptions);
  }

  saveCusDto(cusDTO: CusDTO): Observable<any> {
    console.log(this.API_URL + '/create',cusDTO)
    return this.httpClient.post<any>(this.API_URL + '/create',cusDTO,this.httpOptions);
  }

  findByIdCustomer(id: number): Observable<HttpEvent<Customer>> {
    return this.httpClient.get<Customer>(this.API_URL + '/'+id,this.httpOptions);
  }

  updateCusDto(cusDTO: CusDTO): Observable<any> {
    console.log(this.API_URL + '/edit',cusDTO,this.httpOptions);
    return this.httpClient.patch<any>(this.API_URL + '/edit',cusDTO,this.httpOptions);
  }

//tung
  getAllCustomer(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/list' + '?page='+ page,this.httpOptions);
  }

// Tung create method delete customer
  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.API_URL +'/delete/'+id,this.httpOptions);
  }
// Tung create method search customer
  searchCustomer(page: number, account: string,status: string, province: string,dateBirthFrom: string, dateBirthTo: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/search' + '?page=' + page + '&account=' + account+ '&status=' + status + '&province=' + province
      + '&dateBirthFrom=' + dateBirthFrom + '&dateBirthTo=' + dateBirthTo ,this.httpOptions);
  }
// Tung create method get list status
  getAllStatus(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL + '/customerStatus',this.httpOptions);
  }

  updateCusUDto(customerDto:CustomerDto): Observable<any> {
    console.log(this.API_URL + '/edit-account',customerDto,this.httpOptions);
    return this.httpClient.patch<any>(this.API_URL + '/edit-account',customerDto,this.httpOptions);
  }

  //vu

  findByIdAccount(id: number): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL + '/account/'+id,this.httpOptions);
  }
}
