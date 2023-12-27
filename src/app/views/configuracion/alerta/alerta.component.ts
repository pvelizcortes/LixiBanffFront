import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../constants/global-constants';
import { UtilsService } from '../../../services/utils.service'
// Models
import { Alerta } from '../../../shared/alerta';
// Services
import { AlertaService } from '../../../services/alerta.service';
import { ConfirmationService } from '../../../services/confirmation.service';
// Mat Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter'; // No Borrar
// Dialog
import { MatDialog } from '@angular/material/dialog';
import { AlertaFormComponent } from './alerta-form/alerta-form.component';
// Export PDF
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})

export class AlertaComponent implements OnInit {
  // Principal Properties
  _entity: string = 'Alerta';
  _title: string = 'Mantenedor de ' + this._entity;
  _createName: string = GlobalConstants.createButtonName;
  _searchText: string = GlobalConstants.searchPlaceHolder;
  _pageSizeOptions: number[] = GlobalConstants.pageSizeOptions;
  _noSearchResults: string = GlobalConstants.noSearchResults;
  _showModal: boolean = false;  
  // Mat Table
  displayedColumns: string[] = ['codigoAlerta', 'correoAlerta', 'medicion', 'active', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('tableSort') tableSort = new MatSort();

  constructor(public dialog: MatDialog,
    private _service: AlertaService,
    private _confirm: ConfirmationService,
    private _util: UtilsService) {
  }

  ngOnInit(): void {
    this.getList();
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.tableSort;
  }

  getList(filterParam?: object) {
    if (filterParam) {
      // Add filters here...
    }
    else {
      this._service.getList().subscribe({
        next : (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        },
        error: (e) => this._util.processError(e)      
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

  openDialog(item?: Alerta): void {
    const dialogRef = this.dialog.open(AlertaFormComponent, {
      data: item, width: '100%', position: { top: '8vh' }
    });
    dialogRef.afterClosed().subscribe({
      next : (result) => {
        this.getList();
      },
      error: (e) => this._util.processError(e)   
    });
  }

  async deleteRow(item: Alerta): Promise<void> {
    const resp = await this._confirm.confirmation('Desactivar', `¿Está seguro de desactivar al ${this._entity} seleccionado?`)
    if (resp) {
      this._service.delete(item.alertaId).subscribe({
        next : (data) => {
          this._util.alertSuccess(data.message, this._title);
          this.getList();
        },
        error: (e) => this._util.processError(e)      
      });
    }
    else {
      this._util.alertWarning('Acción cancelada por el usuario', this._title);
    }
  }
}
