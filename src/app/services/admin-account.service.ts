import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// Model
import { Client } from '../shared/client';

@Injectable({
  providedIn: 'root'
})

export class AdminAccountService {
  myAppUrl: string;
  principalUrl: string = '/api/Cliente/';

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
    return this.http.get(this.myAppUrl + this.principalUrl + 'GetListClient');
  }

  createClient(cliente : Client): Observable<any>{
    return this.http.post(this.myAppUrl + this.principalUrl + 'CreateClient', cliente);
  }

  saveClient(cliente : Client): Observable<any>{
    return this.http.post(this.myAppUrl + this.principalUrl + 'SaveClient', cliente);
  }

  deleteClient(clienteId : number): Observable<any>{
    return this.http.post(this.myAppUrl + this.principalUrl + 'DeleteClient', clienteId);
  }
}