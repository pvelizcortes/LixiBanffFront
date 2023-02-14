import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioDto, Users } from '../shared/users';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  loginValidate: string = '/api/Login/Validate';
  userInfo: string = '/api/Login/GetUserInfo';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  login(usuario: UsuarioDto): Observable<any> {
    return this.http.post(this.myAppUrl + this.loginValidate, usuario);
  }

  getUserInfo(usuario: UsuarioDto): Observable<any> {
    return this.http.post(this.myAppUrl + this.userInfo, usuario);
  }

  setLocalStorage(data: any): void {
    localStorage.setItem('token', data);
  }

  setUserInfo(data: any): void {
    localStorage.setItem('userInfo', data);
  }

  isLogged() {
    const token = localStorage.getItem('token');
    return token != undefined;
  }

  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token != undefined) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken;
    }
  }

  removeLocalStorge(): void {
    localStorage.removeItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
  
  getUser(): any {
    var userInfo = localStorage.getItem('userInfo');
    if (userInfo)
      return JSON.parse(userInfo);
  }
}
