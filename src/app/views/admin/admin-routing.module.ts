import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminClientsComponent } from './admin-clients/admin-clients.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administrador'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-dashboard'
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        data: {
          title: 'Dashboard Administrador'
        }
      },   
      {
        path: 'clients',
        component: AdminClientsComponent,
        data: {
          title: 'Clientes'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
