import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../constants/global-constants';
import { ToastrService } from 'ngx-toastr';
// Models
import { Pila } from '../../../shared/pila';
// Services
import { PilaService } from '../../../services/pila.service';
import { ConfirmationService } from '../../../services/confirmation.service';
// Mat Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter'; // No Borrar
// Dialog
import { MatDialog } from '@angular/material/dialog';
import { PilaFormComponent } from './pila-form/pila-form.component';
// Export PDF
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-pila',
  templateUrl: './pila.component.html',
  styleUrls: ['./pila.component.scss']
})

export class PilaComponent implements OnInit {
  // Principal Properties
  _entity: string = 'Pila';
  _title: string = 'Mantenedor de ' + this._entity;
  _createName: string = GlobalConstants.createButtonName;
  _searchText: string = GlobalConstants.searchPlaceHolder;
  _pageSizeOptions: number[] = GlobalConstants.pageSizeOptions;
  _noSearchResults: string = GlobalConstants.noSearchResults;
  _showModal: boolean = false;
  // Mat Table
  displayedColumns: string[] = ['nombrePila', 'correoPila', 'descripcionPila', 'active', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('tableSort') tableSort = new MatSort();

  constructor(public dialog: MatDialog,
    private _service: PilaService,
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

  openDialog(item?: Pila): void {
    const dialogRef = this.dialog.open(PilaFormComponent, {
      data: item, width: '100%', position: { top: '8vh' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getList();
    });
  }

  async deleteRow(item: Pila): Promise<void> {
    const resp = await this._confirm.confirmation('Desactivar', `¿Está seguro de desactivar al ${this._entity} seleccionado?`)
    if (resp) {
      this._service.delete(item.pilaId).subscribe(data => {
        this.toastr.success(data.message, this._title);
        this.getList();
      });
    }
    else {
      this.toastr.warning('Acción cancelada por el usuario', this._title);
    }
  }
}
