import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// Model
import { Nodo, NodoMediciones } from '../shared/nodo';


@Injectable({
  providedIn: 'root'
})

export class NodoService {
  myAppUrl: string;
  principalUrl: string = '/api/Nodo/';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getList(): Observable<any> {
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetList');
  }

  getSelect(pilaId?: number, zonaId?: number): Observable<any> {
    let queryParams = { "pilaId": pilaId ? pilaId : 0, "zonaId": zonaId ? zonaId : 0 };
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetSelect', { params: queryParams });
  }

  save(_obj: Nodo, isNew: boolean): Observable<any> {
    if (isNew) {
      return this.http.post(this.myAppUrl + this.principalUrl + 'Create', _obj);
    }
    else {
      return this.http.post(this.myAppUrl + this.principalUrl + 'Save', _obj);
    }
  }

  delete(_identity_id: number): Observable<any> {
    return this.http.post(this.myAppUrl + this.principalUrl + 'Delete', _identity_id);
  }

  // Others
  getTipoNodoSelect(): Observable<any> {
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetTipoNodoSelect');
  }

  getTipoNodo(tipoNodoId: number): Observable<any> {
    let queryParams = { "tipoNodoId": tipoNodoId ? tipoNodoId : 0 };
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetTipoNodo', { params: queryParams });
  }

  saveMediciones(_obj: Nodo, mediciones: NodoMediciones[]): Observable<any> {
    var data = {
      nodo: _obj,
      mediciones: mediciones
    }
    return this.http.post(this.myAppUrl + this.principalUrl + 'SaveMediciones', data);
  }

  getMediciones(nodoId: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetMediciones', { params: { nodoId: nodoId } });
  }

  getMedicionesByPila(pilaId: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetMedicionesByPila', { params: { pilaId: pilaId } });
  }
}