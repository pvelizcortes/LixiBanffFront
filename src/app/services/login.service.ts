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

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  login(usuario: UsuarioDto): Observable<any> {
    return this.http.post(this.myAppUrl + this.loginValidate, usuario);
  }

  setLocalStorage(data: any): void {
    localStorage.setItem('token', data);
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
}
