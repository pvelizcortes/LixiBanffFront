import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PilaComponent } from './pila/pila.component';
import { NodoComponent } from './nodo/nodo.component';
import { UsersComponent } from './users/users.component';
import { AlertaComponent } from './alerta/alerta.component';
import { MapNodoComponent } from '../configuracion/map-nodo/map-nodo.component';

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
        path: 'usuarios',
        component: UsersComponent,
        data: {
          title: 'Usuarios'
        }
      },
      {
        path: 'pila/:idProyecto',
        component: PilaComponent,
        data: {
          title: 'Pila'
        }
      },
      {
        path: 'nodo/:idProyecto',
        component: NodoComponent,
        data: {
          title: 'Nodo'
        }
      },
      {
        path: 'alerta',
        component: AlertaComponent,
        data: {
          title: 'Alerta'
        }
      },
      {
        path: 'map-nodo/:id',
        component: MapNodoComponent,
        data: {
          title: 'Map Nodo'
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
