import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// Model
import { Pila } from '../shared/pila';

@Injectable({
  providedIn: 'root'
})

export class PilaService {
  myAppUrl: string;
  principalUrl: string = '/api/Pila/';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;   
  }

  getList(): Observable<any>{
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetList');
  }

  getSelect(): Observable<any>{
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetSelect');
  }
  
  save(_obj : Pila, isNew : boolean): Observable<any>{
    if (isNew){
      return this.http.post(this.myAppUrl + this.principalUrl + 'Create', _obj);
    }
    else{
      return this.http.post(this.myAppUrl + this.principalUrl + 'Save', _obj);
    }   
  }

  delete(_identity_id : number): Observable<any>{
    return this.http.post(this.myAppUrl + this.principalUrl + 'Delete', _identity_id);
  }
}