import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatisticByComputer} from '../../model/statistic/statistic-by-computer';
import {StatisticByMonth} from '../../model/statistic/statistic-by-month';
import {StatisticByAccount} from '../../model/statistic/statistic-by-account';
import {TokenStorageService} from "../account/token-storage.service";

@Injectable({
  providedIn: 'root'
})
// Create by HauHP
export class StatisticService {
  API_URL_COMPUTER = 'http://localhost:8080/statistic/by-computer';
  API_URL_MONTH = 'http://localhost:8080/statistic/by-month';
  API_URL_ACCOUNT = 'http://localhost:8080/statistic/by-account';

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

  getStatisticByComputer(startDate: string, endDate: string): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL_COMPUTER + '/' + startDate + '/' + endDate, this.httpOptions);
  }

  getStatisticByMonth(startDate: string, endDate: string): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL_MONTH + '/' + startDate + '/' + endDate, this.httpOptions);
  }

  getStatisticByAccount(startDate: string, endDate: string): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_URL_ACCOUNT + '/' + startDate + '/' + endDate, this.httpOptions);
  }
}
