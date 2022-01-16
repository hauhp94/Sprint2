import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Gender} from '../../model/gender/gender';
import {Employee} from '../../model/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public API = 'http://localhost:8080/employee';

  constructor(public httpClient: HttpClient) {
  }

// creator: HauHP
  private API_EMPLOYEE = 'http://localhost:8080/employee/create';
  private API_GENDER = 'http://localhost:8080/gender';
  private API_EMPLOYEE_FIND: 'http://localhost:8080/employee';


  save(employee): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.API_EMPLOYEE, employee);
  }

  getGenderList(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.API_GENDER);
  }

  findById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>('http://localhost:8080/employee/' + id);
  }

  update(value: any) {
    return this.httpClient.patch<any>('http://localhost:8080/employee/edit/', value);
  }

  // creator: Huynh
  findAll(page: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/employee/list?page=' + page);
  }

  findAllListAddress(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:8080/employee/listAddress');
  }


  deleteEmployee(id: number, employee: Employee): Observable<void> {
    return this.httpClient.patch<void>('http://localhost:8080/employee/' + id, employee);
  }

  searchEmployee(page: number, name: string, phone: string, address: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/employee/search?page=' + page +
      '&name=' + name + '&phone=' + phone + '&address=' + address);
  }

// thuy
  updateInfor(value: any) {
    return this.httpClient.patch<any>('http://localhost:8080/employee/edit-infor/', value);
  }
  // nhung
  getAllUser(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API + '/listEmployee');
  }
}
