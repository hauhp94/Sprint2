import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameType} from '../../../model/game/game-type';
import {TokenStorageService} from "../../account/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class GameTypeService {
  public API_GAME_TYPE = 'http://localhost:8080/gameType/api';

  httpOptions: any;

  constructor(public httpClient: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllGameType(): Observable<any> {
    return this.httpClient.get<any>(this.API_GAME_TYPE);
  }
}
