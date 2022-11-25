import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../constants/global-constants';
import { ToastrService } from 'ngx-toastr';
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
import { UsersFormComponent } from './users-form/users-form.component';
// Export PDF
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  // Principal Properties
  _entity: string = 'Usuario';
  _title: string = 'Mantenedor de ' + this._entity;
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

  constructor(public dialog: MatDialog,
    private _service: UsersService,
    private _confirm: ConfirmationService,
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

  openDialog(item?: Users): void {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      data: item, width: '100%', position: { top: '8vh' }
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
}
