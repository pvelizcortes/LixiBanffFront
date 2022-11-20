import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import { IconModule } from '@coreui/icons-angular';

// Components
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PilaComponent } from './pila/pila.component';
import { PilaFormComponent } from './pila/pila-form/pila-form.component';

import { PanoComponent } from './pano/pano.component';
import { PanoFormComponent } from './pano/pano-form/pano-form.component';
// Routing
import { ConfiguracionRoutingModule } from './configuracion-routing.module';

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
  AlertModule  
} from '@coreui/angular';

@NgModule({
  declarations: [
    MiPerfilComponent,
    PilaComponent,
    PilaFormComponent,
    PanoComponent,
    PanoFormComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
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
    AlertModule
  ]
})
export class ConfiguracionModule {
}
