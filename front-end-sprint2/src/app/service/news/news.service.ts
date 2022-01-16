import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../../model/news/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public API_LIMIT_10 = 'http://localhost:8080/news/limit10';
  public API_MORE = 'http://localhost:8080/news/more';
  public API_LIMIT_5 = 'http://localhost:8080/news/limit5';
  public API = 'http://localhost:8080/news';

  constructor(public httpClient: HttpClient) { }

  getNewsLimit10(): Observable<any> {
    return this.httpClient.get<any>(this.API_LIMIT_10);
  }

  getNewsMore(): Observable<any> {
    return this.httpClient.get<any>(this.API_MORE);
  }

  getNewsLimit5(): Observable<any> {
    return this.httpClient.get<any>(this.API_LIMIT_5);
  }

  saveGame(news: News): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.API, news);
  }
}
