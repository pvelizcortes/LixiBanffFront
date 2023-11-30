import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { LoginService } from './services/login.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'LixiBanff';
  currentRoute: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private loginService: LoginService
  ) {
    titleService.setTitle(this.title);
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.currentRoute = "";
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loginService.checkSession();
      }
      if (event instanceof NavigationEnd) {       
        this.currentRoute = event.url;
      }
      if (event instanceof NavigationError) {
     
      }     
    });
  }
}
