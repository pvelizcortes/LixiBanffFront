import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
  {    
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'  
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'admin',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/admin/admin.module').then((m) => m.AdminModule)
      },
      {
        path: 'dashboard',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'mediciones',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/mediciones/mediciones.module').then((m) => m.MedicionesModule)
      },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('./views/configuracion/configuracion.module').then((m) => m.ConfiguracionModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login LixiBanff'
    }
  }, 
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
