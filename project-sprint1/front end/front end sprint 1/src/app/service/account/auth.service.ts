import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  // creator: Tra

  login(user) {
    return this.http.post<any>(AUTH_API + 'signin', user, httpOptions);
  }

  logout() {
    return this.http.patch<any>(AUTH_API + 'singout', httpOptions);
  }
}
