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
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AdminClientsComponent } from './admin-clients/admin-clients.component';
import { AdminClientsParentComponent } from './admin-clients-parent/admin-clients-parent.component';
import { AdminClientsFormComponent } from './admin-clients/admin-clients-form/admin-clients-form.component';
import { AdminClientsParentFormComponent } from './admin-clients-parent/admin-clients-parent-form/admin-clients-parent-form.component';
import { AdminClientsNodoComponent } from './admin-clients/admin-clientes-nodo/admin-clients-nodo.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUsersFormComponent } from './admin-users/admin-users-form/admin-users-form.component';
// Routing
import { AdminRoutingModule } from './admin-routing.module';

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


@NgModule({
  declarations: [
    AdminClientsComponent,
    AdminClientsParentComponent,
    AdminClientsFormComponent,
    AdminClientsParentFormComponent,
    AdminClientsNodoComponent,
    AdminUsersFormComponent,
    AdminUsersComponent,
    AdminDashboardComponent
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
  ]
})
export class AdminModule {
}
