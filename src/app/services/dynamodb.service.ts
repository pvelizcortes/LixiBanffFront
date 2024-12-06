import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// Model
import { Nodo } from '../shared/nodo'

@Injectable({
  providedIn: 'root'
})

export class DynamodbService {
  myAppUrl: string;
  principalUrl: string = '/api/DynamoDB/';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  // DynamoDB
  FilterByTipoNodo(from: Date, to: Date, tipoNodoId: number, pilaId: number): Observable<any> {
    let queryParams = {
      "from": from.toString(),
      "to": to.toString(),
      "tipoNodoId": tipoNodoId.toString(),
      "pilaId": pilaId.toString()
    };
    return this.http.get(this.myAppUrl + this.principalUrl + 'FiltrarPorTipoNodo', { params: queryParams });
  }

  FilterByPila(from: Date, to: Date, pilaId: number): Observable<any> {
    let queryParams = {
      "from": from.toString(),
      "to": to.toString(),
      "pilaId": pilaId.toString()
    };
    return this.http.get(this.myAppUrl + this.principalUrl + 'FiltrarPorPila', { params: queryParams });
  }

  getChartData(from: Date, to: Date, pilaId: number, variableId: number): Observable<any> {
    let queryParams = {
      "from": from.toString(),
      "to": to.toString(),
      "pilaId": pilaId.toString(),
      "variableId": variableId
    };
    return this.http.get(this.myAppUrl + this.principalUrl + 'ChartData', { params: queryParams });
  }

  GetPilaData(pilaId: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetPilaData', { params: { pilaId: pilaId } });
  }
}