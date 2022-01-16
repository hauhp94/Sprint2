import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contract} from '../../model/contract/contract';
import {Observable} from 'rxjs';
import {TypeContract} from '../../model/contract/type-contract';
import {TypeProduct} from '../../model/contract/type-product';
import {StatusContract} from '../../model/contract/status-contract';
/*Linh*/
const API_CONTRACT = 'http://localhost:8080/contract';
const API_TYPE_PRODUCT = 'http://localhost:8080/typeProduct';

const API_URL = 'http://localhost:8080';
const API_STATUS_CONTRACT = 'http://localhost:8080/statusContract';
const API_TYPE_CONTRACT = 'http://localhost:8080/contract/list-type-contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  /*long*/
  private API_URL_CLC = 'http://localhost:8080/contract/create-liquidation-contract';
  private API_URL_LLC = 'http://localhost:8080/contract/list-liquidation-product';
  private API_URL_FC = 'http://localhost:8080/contract/findContract/';
  private API_URL_S = 'http://localhost:8080/contract/search';
  private API_URL_LSC = 'http://localhost:8080/contract/list-status-contract';
  private API_URL_LTP = 'http://localhost:8080/contract/list-type-product';
  private API_URL_LTC = 'http://localhost:8080/contract/list-type-contract';
  private API_URL_F = 'http://localhost:8080/contract/setStatus/';
  private API_URL_UC = 'http://localhost:8080/contract/update-liquidation-contract';
  /*Vinh*/
  API_URL = 'http://localhost:8080/contract';
  listIdContract = [];
  /*Vu*/
  contract: Contract = null;


  /*long*/
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  /*long*/
  createLiquidationContract(contract: Contract): Observable<Contract> {
    return this.httpClient.post<Contract>(this.API_URL_CLC, JSON.stringify(contract), this.httpOptions);
  }

  /*long*/
  updateLiquidationContract(contract: Contract): Observable<Contract> {
    return this.httpClient.patch<Contract>(this.API_URL_UC, JSON.stringify(contract), this.httpOptions);
  }

  /*long*/
  getProductsLiquidation(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_LLC + '?page=' + page);
  }

  /*long*/
  getContractById(contractId: number): Observable<Contract> {
    return this.httpClient.get<Contract>(this.API_URL_FC + contractId);
  }

  /*long*/
  searchContracts(nameProduct: string, nameTypeProduct: string, loan: number | string, page: number): Observable<any> {
    if (loan == null || loan == undefined) {
      loan = '';
    }
    return this.httpClient.get<any>(this.API_URL_S + '?nameProduct=' + nameProduct +
      '&nameTypeProduct=' + nameTypeProduct + '&loan=' + loan + '&page=' + page);
  }

  /*/!*long*!/
  getAllTypeContract(): Observable<TypeContract[]> {
    return this.httpClient.get<TypeContract[]>(this.API_URL_LTC);
  }*/

  /*long*/
  getAllTypeProductL(): Observable<TypeProduct[]> {
    return this.httpClient.get<TypeProduct[]>(this.API_URL_LTP);
  }

  /*/!*long*!/
  getAllStatusContract(): Observable<StatusContract[]> {
    return this.httpClient.get<StatusContract[]>(this.API_URL_LSC);
  }*/

  /*long*/
  setStatusLiquidById(id: number, status: number): Observable<any> {
    return this.httpClient.patch(this.API_URL_F + id, status);
  }

  /*long*/
  sendData(listId: number[]) {
    this.listIdContract = listId;
  }

  /*long*/
  ReceiveData() {
    return this.listIdContract;
  }

  /*long*/
  resetData() {
    this.listIdContract = [];
  }

  // Linh code
  getTypeProductList(): Observable<TypeProduct[]> {
    return this.httpClient.get<TypeProduct[]>(API_TYPE_PRODUCT);
  }

  // Linh code
  save(contract): Observable<Contract> {
    return this.httpClient.post<Contract>(API_CONTRACT, contract);
  }

  /*Vinh*/
  getListContract(page: number) {
    return this.httpClient.get(this.API_URL + '/list' + '?page=' + page);
  }

  /*Vinh*/
  searchContract(code: string, name: string, product: string, date: string, page: number) {
    return this.httpClient.get(this.API_URL + '/search/' + code + ',' + name + ',' + product + ',' + date + '?page=' + page);
  }

  /*Vinh*/
  paymentContract(contract: Contract) {
    return this.httpClient.post(this.API_URL + '/payment', contract);
  }

  /*Vu*/
  sendContract(contract: Contract) {
    this.contract = contract;
  }

  /*Vu*/
  receiveContract() {
    return this.contract;
  }

  //vu code
  deleteContractById(id: number): Observable<Contract> {
    console.log(`${API_URL}/contract/delete/${id}`);
    return this.httpClient.delete<Contract>(`${API_URL}/contract/delete/${id}`);
  }

//vu code
  findById(id: number): Observable<Contract> {
    return this.httpClient.get<Contract>(`${API_URL}/contract/${id}`);
  }

//vu code
  getAllContractHistory(page: number): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/contract/list-history' + '?page=' + page);
  }

//vu code
  searchContractHistory(page: number, customer: string,
                        startDateFrom: string, startDateTo: string, productName: string,
                        typeContract: string, statusContract: string): Observable<any> {

    console.log(' day la ngay ket thuc' + startDateTo);
    console.log(' day la ngay bat dau:' + startDateFrom);

    if (customer === undefined || customer == null) {
      customer = '';
      console.log('day la customer' + customer);
    }
    if (statusContract === undefined || statusContract == null) {
      statusContract = '';
    }
    if (typeContract === undefined || typeContract == null) {
      typeContract = '';
    }
    if (productName === undefined || productName == null) {
      productName = '';
    }
    if (startDateFrom === undefined || startDateFrom == null) {
      startDateFrom = '';
    }
    if (startDateTo === undefined || startDateTo == null) {
      startDateTo = '';
    }
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(API_URL + '/contract/search-history' + '?page=' + page + '&customer=' + customer + '&statusContract=' + statusContract + '&typeContract=' + typeContract + '&productName=' + productName + '&startDateFrom=' + startDateFrom + '&startDateTo=' + startDateTo);
  }

//vu code
  getAllStatusContract(): Observable<any> {
    return this.httpClient.get<any>(API_STATUS_CONTRACT, this.httpOptions);
  }

//vu code
  getAllTypeProduct(): Observable<any> {
    return this.httpClient.get<any>(API_TYPE_PRODUCT, this.httpOptions);
  }

//vu code
  getAllTypeContract(): Observable<any> {
    return this.httpClient.get<any>(API_TYPE_CONTRACT, this.httpOptions);
  }

//vu code
  searchNameStatus(name: string, status: string): Observable<any> {
    if (name === undefined) {
      name = '';
    }
    if (status === undefined) {
      status = '';
    }
    return this.httpClient.get(API_URL + '/contract/searchName?name=' + name + '&status=' + status);
  }

//vu code
  getAll10Contract(): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/contract/list10');

  }

//vu code
  update(id: number, contract: Contract): Observable<any> {
    return this.httpClient.patch<any>(`${API_URL}/contract/${id}`, contract);
  }


}
