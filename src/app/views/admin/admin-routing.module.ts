import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminClientsComponent } from './admin-clients/admin-clients.component';
import { AdminClientsParentComponent } from './admin-clients-parent/admin-clients-parent.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
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
        path: 'projects/:id',
        component: AdminClientsComponent,
        data: {
          title: 'Proyectos'
        }
      },
      {
        path: 'clients',
        component: AdminClientsParentComponent,
        data: {
          title: 'Clientes'
        }
      },
      {
        path: 'users/:id',
        component: AdminUsersComponent,
        data: {
          title: 'Usuarios'
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
