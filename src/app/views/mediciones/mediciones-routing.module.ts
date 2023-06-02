import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltraNodoComponent } from './filtra-nodo/filtra-nodo.component';


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
