import { Component } from '@angular/core';

import { navItems } from './_nav';
import { SpinnerService } from '../../services/spinner.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { INavData } from '@coreui/angular';
import { LoginService } from 'src/app/services/login.service';

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
    navItems.forEach(menu => {
      if (menu.attributes?.['security'] <= userInfo.PerfilId) {
        this.navItemsForShow.push(menu);
      }
    });
  }
}
