import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  userName: string = '';

  constructor(private classToggler: ClassToggleService,
    private loginService: LoginService) {
    super();
    let user = loginService.getUser();
    this.userName = user.NombreUsuario;
  }
}
