import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../shared/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
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
    const usuario: Usuario = {
      nombreUsuario: form.userName,
      password: form.password
    };
 
    this.loginService.login(usuario).subscribe({
      next: (data) => {        
        this.loginService.setLocalStorage(data.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {           
        this.loginForm.reset();
        alert('Usuario / Contraseña Incorrectos.');
      }
    });     
  }
}
