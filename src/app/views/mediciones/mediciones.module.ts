import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { GraficosComponent } from './graficos/graficos.component';
import { ListadoComponent } from './listado/listado.component';
import { ReportesComponent } from './reportes/reportes.component';

import { MedicionesRoutingModule } from './mediciones-routing.module';
import { NgChartsModule } from 'ng2-charts';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

@NgModule({
  declarations: [
    GraficosComponent,
    ListadoComponent,
    ReportesComponent,
  ],
  imports: [
    CommonModule,
    MedicionesRoutingModule,
    ButtonModule,
    ButtonGroupModule,
    GridModule,
    IconModule,
    CardModule,
    UtilitiesModule,
    DropdownModule,
    SharedModule,
    FormModule,
    ReactiveFormsModule,
    DocsComponentsModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    NavbarModule,
    NgChartsModule
  ]
})
export class MedicionesModule {
}
