import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../constants/global-constants';
import { ToastrService } from 'ngx-toastr';
// Models
import { Client } from '../../../shared/client';
// Services
import { AdminAccountService } from '../../../services/admin-account.service'
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
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'activo', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('tableSort') tableSort = new MatSort();
  // For testing
  tableData: Client[] = [
    { clienteId: 1, nombreCliente: 'Pablo 1', correoCliente: 'Veliz 1', active: true },
    { clienteId: 2, nombreCliente: 'Pablo 2', correoCliente: 'Veliz 2', active: true },
    { clienteId: 3, nombreCliente: 'Pablo 3', correoCliente: 'Veliz 3', active: true },
    { clienteId: 1, nombreCliente: 'Pablo 1', correoCliente: 'Veliz 1', active: true },
    { clienteId: 2, nombreCliente: 'Pablo 2', correoCliente: 'Veliz 2', active: true },
    { clienteId: 3, nombreCliente: 'Pablo 3', correoCliente: 'Veliz 3', active: true },
    { clienteId: 4, nombreCliente: 'Pablo 4', correoCliente: 'Veliz 4', active: true }
  ];

  constructor(public dialog: MatDialog,
    private _service: AdminAccountService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getList();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.tableSort;
  }

  getList(filterParam?: object) {
    if (filterParam) {

    }
    else {
      this._service.getList().subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    }
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
      this.getList();
    });
  }

  deleteRow(item: Client): void {
    this._service.deleteClient(item.clienteId).subscribe(data => {
      this.toastr.success(data.message, 'Mantenedor de Clientes:');
      this.getList();
    });
  }
}
