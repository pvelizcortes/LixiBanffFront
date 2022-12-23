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
  FilterByNodo(from: Date, to: Date, nodoId: number): Observable<any> {
    let queryParams = {
      "from": from.toString(),
      "to": to.toString(),
      "nodoId": nodoId.toString()
    };
    return this.http.get(this.myAppUrl + this.principalUrl + 'FiltrarPorNodo', { params: queryParams });
  }
}