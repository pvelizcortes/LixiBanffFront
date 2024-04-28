import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users, UsuarioDto } from '../../../shared/users';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  cargando = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    loginService.removeLocalStorge();
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(form: any) {
    this.cargando = true;
    const usuario: UsuarioDto = {
      nombreUsuario: form.userName,
      password: form.password
    };

    // Login
    this.loginService.login(usuario).subscribe({
      next: (data) => {
        this.cargando = false;
        // Set Token Local    
        this.loginService.setLocalStorage(data.token);
        // Get User Info
        this.loginService.getUserInfo(usuario).subscribe({
          next: (userData) => {
            // Set User Data in Session
            this.loginService.setUserInfo(userData.user);
            let user = this.loginService.getUser();            
            this.router.navigate([user.isSuperAdmin ? '/admin/admin-dashboard' : '/dashboard']);
          },
          error: (error) => {

          }
        })      
      },
      error: (error) => {
        this.cargando = false;
        this.loginForm.reset();
        alert('Usuario / Contraseña Incorrectos.');
      }
    });
  }
}
