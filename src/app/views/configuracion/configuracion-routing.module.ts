import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PilaComponent } from './pila/pila.component';

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
      },
      {
        path: 'pila',
        component: PilaComponent,
        data: {
          title: 'Pila'
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
