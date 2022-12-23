import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GraficosComponent } from './graficos/graficos.component';
import { FiltraNodoComponent } from './listado/filtra-nodo.component';
import { RealTimeComponent } from './real-time/real-time.component';
import { ReportesComponent } from './reportes/reportes.component';

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
        path: 'real-time',
        component: RealTimeComponent,
        data: {
          title: 'Medición en tiempo Real'
        }
      },  
      {
        path: 'filtra-nodo',
        component: FiltraNodoComponent,
        data: {
          title: 'Filtra por Nodo'
        }
      },
      {
        path: 'graficos',
        component: GraficosComponent,
        data: {
          title: 'Graficos'
        }
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        data: {
          title: 'Reportes'
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicionesRoutingModule {
}
