import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    localStorage.setItem('loginUser', '');
  }

  loginForm = this.formBuilder.group({
    userName: '',
    password: ''
  });

  onSubmit(form: any) {
    if (form.userName == "user@lixibanff.com" && form.password == "lixi1234") {
      localStorage.setItem('loginUser', form.userName);
      this.router.navigate(['/dashboard']);
    }
    else {
      alert('Usuario o Contraseña incorrecto');
    }
  }
}
