import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../constants/global-constants';
// Models
import { Client } from '../../../shared/client';
// Mat Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
// Dialog
import { MatDialog } from '@angular/material/dialog';
import { AdminClientsFormComponent } from './admin-clients-form/admin-clients-form.component';
// Export PDF
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.scss']
})

export class AdminClientsComponent implements OnInit {
  // Principal Properties
  _title: string = 'Mantenedor de Clientes';
  _createName: string = GlobalConstants.createButtonName;
  _searchText: string = GlobalConstants.searchPlaceHolder;
  _pageSizeOptions: number[] = GlobalConstants.pageSizeOptions;
  _noSearchResults: string = GlobalConstants.noSearchResults;
  _showModal: boolean = false;
  // Mat Table
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('tableSort') tableSort = new MatSort();
  // For testing
  tableData: Client[] = [
    { ClienteId: 1, NombreCliente: 'Pablo 1', CorreoCliente: 'Veliz 1', Active: true },
    { ClienteId: 2, NombreCliente: 'Pablo 2', CorreoCliente: 'Veliz 2', Active: true },
    { ClienteId: 3, NombreCliente: 'Pablo 3', CorreoCliente: 'Veliz 3', Active: true },
    { ClienteId: 1, NombreCliente: 'Pablo 1', CorreoCliente: 'Veliz 1', Active: true },
    { ClienteId: 2, NombreCliente: 'Pablo 2', CorreoCliente: 'Veliz 2', Active: true },
    { ClienteId: 3, NombreCliente: 'Pablo 3', CorreoCliente: 'Veliz 3', Active: true },
    { ClienteId: 4, NombreCliente: 'Pablo 4', CorreoCliente: 'Veliz 4', Active: true }
  ];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.tableData;
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.tableSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ExportPDF() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#principalTable' });
    doc.save(this._title + '.pdf')
  }

  openDialog(item?: Client): void {
    const dialogRef = this.dialog.open(AdminClientsFormComponent, {
      data: item, width: '100%', position: { top: '8vh' }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
