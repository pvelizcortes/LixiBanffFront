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
import { IconModule } from '@coreui/icons-angular';

// Components
import { AdminClientsComponent } from './admin-clients/admin-clients.component';
import { AdminClientsFormComponent } from './admin-clients/admin-clients-form/admin-clients-form.component';
// Routing
import { AdminRoutingModule } from './admin-routing.module';
// Pipes
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';

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
    SearchFilterPipe,
    AdminClientsComponent,
    AdminClientsFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    MatInputModule,
    AlertModule
  ]
})
export class AdminModule {
}
