import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { HttpClientModule } from '@angular/common/http';

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
import { RealTimeComponent } from './real-time/real-time.component';

@NgModule({
  declarations: [
    GraficosComponent,
    ListadoComponent,
    ReportesComponent,
    RealTimeComponent,
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
    NgChartsModule,
    HttpClientModule
  ]
})
export class MedicionesModule {
}
