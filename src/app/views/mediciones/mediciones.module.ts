import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { GraficosComponent } from './graficos/graficos.component';
import { FiltraNodoComponent } from './listado/filtra-nodo.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MedicionesRoutingModule } from './mediciones-routing.module';

import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';

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
  UtilitiesModule,
  TableModule,
  ModalModule,
  AlertModule,
  WidgetModule,
  AccordionModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { RealTimeComponent } from './real-time/real-time.component';

@NgModule({
  declarations: [
    GraficosComponent,
    FiltraNodoComponent,
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
    NavbarModule,
    CollapseModule,
    NavModule,
    NavbarModule,
    NgChartsModule,
    HttpClientModule,
    FormsModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    NavbarModule,
    TableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    MatTooltipModule,
    ModalModule, 
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    AlertModule,
    WidgetModule,
    AccordionModule
  ],
  providers:[
    DatePipe
  ]
})
export class MedicionesModule {
}
