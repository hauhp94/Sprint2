import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TypeProduct} from '../../model/contract/type-product';
import {PawnRegistration} from '../../model/pawn-registration/pawn-registration';

@Injectable({
  providedIn: 'root'
})
export class PawnRegistrationService {
  private API_URL_PAWN_REGISTRATION = 'http://localhost:8080/pawnRegistration';
  private API_URL_PAWN_TYPE_PRODUCT = 'http://localhost:8080/typeProduct';

  constructor(private httpClient: HttpClient) {
  }

  createPawnRegistration(pawnRegistration: PawnRegistration): Observable<any> {
    return this.httpClient.post<any>(this.API_URL_PAWN_REGISTRATION + "/create", pawnRegistration)
  }

  getAllProduct(): Observable<any> {
    return this.httpClient.get<TypeProduct[]>(this.API_URL_PAWN_TYPE_PRODUCT);
  }

  getAllPawnRegistration(page: number): Observable<any> {
    return this.httpClient.get<PawnRegistration[]>(this.API_URL_PAWN_REGISTRATION + '?page=' + page);
  }

  edit(id: number): Observable<any> {
    // @ts-ignore
    return this.httpClient.patch<any>(this.API_URL_PAWN_REGISTRATION + '/' + id);
  }
}
