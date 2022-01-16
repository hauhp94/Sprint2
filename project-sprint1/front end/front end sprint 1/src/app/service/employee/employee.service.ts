import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Position} from '../../model/employee/position';
import {Employee} from '../../model/employee/employee';
import {Province} from '../../model/address/province';
import {TokenStorageService} from "../account/token-storage.service";

const API_POSITION = 'http://localhost:8080/position';
const API_PROVINCE = 'http://localhost:8080/province';
const API_EMPLOYEE = 'http://localhost:8080/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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

  // creator: linhnv
  getPositionList(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(API_POSITION, this.httpOptions);
  }

  // creator: linhnv
  save(employee): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(API_EMPLOYEE, employee, this.httpOptions);
  }

  // creator: linhnv
  findById(id: number): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(API_EMPLOYEE + '/' + id, this.httpOptions);
  }

  // creator: linhnv
  edit(employee: any): Observable<HttpEvent<any>> {
    return this.httpClient.put<any>(API_EMPLOYEE, employee, this.httpOptions);
  }

  // khue create method get list position
  getAllPosition(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(API_POSITION, this.httpOptions);
  }

  // khue create method get list province
  getAllProvince(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(API_PROVINCE, this.httpOptions);
  }

  // khue create method get list employee
  getAllEmployee(page: number): Observable<any> {
    return this.httpClient.get<any>(API_EMPLOYEE + '?page=' + page, this.httpOptions);
  }

  // khue create method delete employee
  deleteEmployee(id: number) {
    return this.httpClient.delete<any>(API_EMPLOYEE + '/' + id, this.httpOptions);
  }

  // khue create method search employee
  // tslint:disable-next-line:max-line-length
  searchEmployee(page: number, employeeId: string, dateBirthFrom: string, dateBirthTo: string, dateWorkFrom: string, dateWorkTo: string, position: string, province: string): Observable<any> {
    return this.httpClient.get<any>(API_EMPLOYEE + '/search' + '?page=' + page + '&employeeId=' + employeeId
      + '&dateBirthFrom=' + dateBirthFrom + '&dateBirthTo=' + dateBirthTo + '&dateWorkFrom=' + dateWorkFrom
      + '&dateWorkTo=' + dateWorkTo + '&position=' + position + '&province=' + province, this.httpOptions);
  }
}
