import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Computer} from "../../model/computer/computer";
import {ToastrService} from "ngx-toastr";
import { Injectable } from '@angular/core';
import {ComputerType} from '../../model/computer/type-computer';
import {ComputerStatus} from '../../model/computer/status-computer';
import {ComputerManufacturer} from '../../model/computer/manufacturer-computer';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../account/token-storage.service";


@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  public API: string = "http://localhost:8080"
  private API_URL_COMPUTER = 'http://localhost:8080/computer';
  private API_URL_COMPUTER_TYPE = 'http://localhost:8080/computerType';
  private API_URL_COMPUTER_STATUS = 'http://localhost:8080/computerStatus';
  private API_URL_COMPUTER_MANUFACTURER = 'http://localhost:8080/computerManufacturer';
  private API_URL_COMPUTER_PAGE = 'http://localhost:8080/computerPage';

  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ,private toast: ToastrService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

/*long-computer*/
  createComputerDTO(computerDTO: Computer): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.API + '/create-computer',
      JSON.stringify(computerDTO), this.httpOptions)
  };
  /*long-computer*/
  updateComputerDTO(id: number, computerDTO: Computer): Observable<HttpEvent<any>> {
    return this.httpClient.patch<any>(this.API + '/update-computer/' + id,
      JSON.stringify(computerDTO), this.httpOptions)
  }
  /*long-computer*/
  showMessageSuccess(message) {
    this.toast.success(message, "Notify: ");
  }
  /*long-computer*/
  showMessageErrors(message) {
    this.toast.error(message, "Notify: ");
  }

  getAllComputerPage(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_COMPUTER_PAGE + '?page=' + page,this.httpOptions);
  }

  getAllComputer() {
    return this.httpClient.get<Computer[]>(this.API_URL_COMPUTER,this.httpOptions);
  }

  getAllComputerType() {
    return this.httpClient.get<ComputerType[]>(this.API_URL_COMPUTER_TYPE,this.httpOptions);
  }

  getAllComputerStatus() {
    return this.httpClient.get<ComputerStatus[]>(this.API_URL_COMPUTER_STATUS,this.httpOptions);
  }

  getAllComputerManufacturer() {
    return this.httpClient.get<ComputerManufacturer[]>(this.API_URL_COMPUTER_MANUFACTURER,this.httpOptions);
  }

  getComputerById(computerId: any): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL_COMPUTER + '/' + computerId,this.httpOptions);
  }

  delete(idComputer: number) {
    return this.httpClient.delete<any>(this.API_URL_COMPUTER + '/' + idComputer,this.httpOptions);
  }

  searchComputer(computerId: string, location: string, computerType: string, computerStatus: string, startDateFrom: string,
                 startDateTo: string, page: number): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL_COMPUTER + '/searchComputer?computerId=' + computerId + '&location=' +
      location + '&computerType=' + computerType + '&computerStatus=' + computerStatus + '&startDateFrom=' + startDateFrom +
      '&startDateTo=' + startDateTo + '&page=' + page,this.httpOptions);
  }

}

