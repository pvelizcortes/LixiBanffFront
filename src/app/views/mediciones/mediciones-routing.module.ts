import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltraNodoComponent } from './filtra-nodo/filtra-nodo.component';
import { FiltraPilaComponent } from './filtra-pila/filtra-pila.component';
import { GraficosComponent } from './graficos/graficos.component';
import { GraficoPilaComponent } from './grafico-pila/grafico-pila.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Mediciones'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mediciones'
      },
      {
        path: 'filtra-nodo',
        component: FiltraNodoComponent,
        data: {
          title: 'Filtra por Nodo'
        }
      },
      {
        path: 'filtra-pila',
        component: FiltraPilaComponent,
        data: {
          title: 'Filtra por Pila'
        }
      },
      {
        path: 'grafico',
        component: GraficosComponent,
        data: {
          title: 'Graficos'
        }
      }   
      ,
      {
        path: 'grafico-pila',
        component: GraficoPilaComponent,
        data: {
          title: 'Grafico Pila'
        }
      } 
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicionesRoutingModule {
}
