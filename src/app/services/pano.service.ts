import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// Model
import { Pano } from '../shared/pano'

@Injectable({
  providedIn: 'root'
})

export class PanoService {
  myAppUrl: string;
  principalUrl: string = '/api/Pano/';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getList(): Observable<any> {
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetList');
  }

  getSelect(pilaId?: number): Observable<any> {
    let queryParams = { "pilaId": pilaId ? pilaId : 0 };
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetSelect', { params: queryParams });
  }

  save(_obj: Pano, isNew: boolean): Observable<any> {
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
}