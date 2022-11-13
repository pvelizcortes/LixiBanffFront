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

  // Form Properties
  errorMessages: any;
  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };
  formErrors = {
    tableSearch: ''
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;   
  }

  getList(): Observable<any>{
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetList');
  }

  create(_obj : Pila): Observable<any>{
    return this.http.post(this.myAppUrl + this.principalUrl + 'Create', _obj);
  }

  save(_obj : Pila): Observable<any>{
    return this.http.post(this.myAppUrl + this.principalUrl + 'Save', _obj);
  }

  delete(_identity_id : number): Observable<any>{
    return this.http.post(this.myAppUrl + this.principalUrl + 'Delete', _identity_id);
  }
}