import { Component } from '@angular/core';

import { navItems } from './_nav';
import { SpinnerService } from '../../services/spinner.service';
import { INavData } from '@coreui/angular';
import { LoginService } from 'src/app/services/login.service';
import { UsersFormComponent } from 'src/app/views/configuracion/users/users-form/users-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public navItemsForShow: INavData[] = [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(public spinnerService: SpinnerService, public loginService: LoginService) {
    var userInfo = loginService.getUser();
    if (userInfo){
      if (userInfo.PerfilId  == 1){
        navItems.forEach(menu => {
          if (menu.attributes?.['security'] == 0) {
            this.navItemsForShow.push(menu);
          }
        });
      }
      else{
        navItems.forEach(menu => {
          if (menu.attributes?.['security'] >= userInfo.PerfilId) {
            this.navItemsForShow.push(menu);
          }
        });
      }      
    }
  }
}
