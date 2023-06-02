import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  userData: any;
  constructor(private loginService: LoginService) {
    
  }

  ngOnInit(): void {
    this.loginService.checkLogin();
    this.userData = this.loginService.getUser();
  }
}
