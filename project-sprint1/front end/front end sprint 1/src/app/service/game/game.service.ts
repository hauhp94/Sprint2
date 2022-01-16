import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../../model/game/game';
import {TokenStorageService} from "../account/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public API_GAME = 'http://localhost:8080/game/api';
  public API_TOP_GAME = 'http://localhost:8080/game/api/top';

  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

// Creator: Thúy
  getAllGamePage(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_GAME + '?page=' + page);
  }

  getTopGame(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(this.API_TOP_GAME,this.httpOptions);
  }

  searchGame(page: number, name: string, gameType: string): Observable<any> {
    return this.httpClient.get<any>(this.API_GAME + '/search' + '?page=' + page + '&name=' + name
      + '&gameType=' + gameType);
  }

  deleteGame(id: number): Observable<any> {
    return this.httpClient.patch<any>(this.API_GAME + '/delete/' + id,this.httpOptions);
  }

  getById(id): Observable<any> {
    return this.httpClient.get<any>(this.API_GAME + '/' + id,this.httpOptions).pipe();
  }

  // Creator: Nhung
  saveGame(game: Game): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.API_GAME, game,this.httpOptions);
  }

  updateGame(id: number, game: Game): Observable<HttpEvent<any>> {
    return this.httpClient.patch<any>(this.API_GAME + '/' + id, game,this.httpOptions);
  }
}
