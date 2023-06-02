import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../constants/global-constants';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
// Models
import { Users } from '../../../shared/users';
// Services
import { UsersService } from '../../../services/users.service';
import { ConfirmationService } from '../../../services/confirmation.service';
// Mat Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter'; // No Borrar
// Dialog
import { MatDialog } from '@angular/material/dialog';
import { AdminUsersFormComponent } from './admin-users-form/admin-users-form.component';
// Export PDF
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { AdminClientService } from 'src/app/services/admin-client.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})

export class AdminUsersComponent implements OnInit {
  // Principal Properties
  _entity: string = 'Usuario';
  _client : string = 'n/a'
  _title: string = 'Usarios del cliente: ' + this._client;
  _createName: string = GlobalConstants.createButtonName;
  _searchText: string = GlobalConstants.searchPlaceHolder;
  _pageSizeOptions: number[] = GlobalConstants.pageSizeOptions;
  _noSearchResults: string = GlobalConstants.noSearchResults;
  _showModal: boolean = false;
  // Mat Table
  displayedColumns: string[] = ['nombreUsuario', 'cliente', 'correoUsuario', 'descripcionUsuario', 'active', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('tableSort') tableSort = new MatSort();
  // Custom Properties
  _clienteId : number = 0;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private _service: UsersService,
    private _clienteService : AdminClientService,
    private _confirm: ConfirmationService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this._clienteId = Number(this.route.snapshot.paramMap.get('id')) ?? '0';
    this.getList();
    this.getClientName();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.tableSort;
  }

  getList(filterParam?: object) {
    if (filterParam) {

    }
    else {
      this._service.getListAdmin(this._clienteId).subscribe(data => {       
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

  openDialog(item?: Users): void {   
    const dialogRef = this.dialog.open(AdminUsersFormComponent, {
      data: { _user :item, _clienteId : this._clienteId }, width: '100%', position: { top: '8vh' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getList();
    });
  }

  async deleteRow(item: Users): Promise<void> {
    const resp = await this._confirm.confirmation('Desactivar', `¿Está seguro de desactivar al ${this._entity} seleccionado?`)
    if (resp) {
      this._service.delete(item.usuarioId).subscribe(data => {
        this.toastr.success(data.message, this._title);
        this.getList();
      });
    }
    else {
      this.toastr.warning('Acción cancelada por el usuario', this._title);
    }
  }

  getClientName(){
    this._clienteService.getById(this._clienteId).subscribe(data => {
      this._client = data.nombreCliente;
    });
  }
}
