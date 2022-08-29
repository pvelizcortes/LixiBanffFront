import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configuracion'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'configuracion'
      },     
      {
        path: 'mi-perfil',
        component: MiPerfilComponent,
        data: {
          title: 'Mi Perfil'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule {
}
