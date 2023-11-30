import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../constants/global-constants';
import { UtilsService } from '../../../services/utils.service'

// Services
import { NodoService } from 'src/app/services/nodo.service';
import { PilaService } from 'src/app/services/pila.service';
import { PanoService } from 'src/app/services/pano.service';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { ConfirmationService } from '../../../services/confirmation.service';
import { ZonaService } from 'src/app/services/zona.service';

// Mat Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter'; // No Borrar

// Export PDF
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-filtra-nodo',
  templateUrl: './filtra-nodo.component.html',
  styleUrls: ['./filtra-nodo.component.scss']
})

export class FiltraNodoComponent implements OnInit {
  // PRINCIPAL PROPERTIES
  _entity: string = 'Nodo';
  _title: string = 'Filtrar por ' + this._entity;
  _createName: string = GlobalConstants.createButtonName;
  _searchText: string = GlobalConstants.searchPlaceHolder;
  _pageSizeOptions: number[] = GlobalConstants.pageSizeOptions;
  _noSearchResults: string = GlobalConstants.noSearchResults;
  _showModal: boolean = false;
  // MAT TABLE
  displayedColumns: string[] = ['fecha', 'nodo', 'sensor', 'valor', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('tableSort') tableSort = new MatSort();
  // FORM
  queryForm: FormGroup;
  // SELECT DATA
  _dataPila: any[];
  _dataPano: any[];
  _dataNodo: any[];

  _dataZona: any[];
  _zonaSelected: any;

  constructor(
    private formBuilder: FormBuilder,
    private _service: NodoService,
    private _confirm: ConfirmationService,
    private _util: UtilsService,
    private _servicePila: PilaService,
    private _servicePano: PanoService,
    private _serviceNodo: NodoService,
    private _serviceZona: ZonaService,
    private _dynamoDB: DynamodbService) {
    this.CreateForm();
  }

  ngOnInit(): void {
    this.GetZonasToSelect();
  }

  CreateForm() {
    this.queryForm = this.formBuilder.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      pilaId: [0],  // FK
      // panoId: [0, [Validators.required, Validators.min(1)]],  // FK  
      nodoId: [0, [Validators.required, Validators.min(1)]], //PK
      zonaId: [0, [Validators.required, Validators.min(1)]],  // FK
    });
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

  onSubmit(): void {
    if (this.queryForm.valid) {
      const formValues = <any>this.queryForm.getRawValue();
      this._dynamoDB.FilterByNodo(formValues.from, formValues.to, formValues.nodoId).subscribe({
        next: (data) => {
          console.log(data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        },
        error: (e) => this._util.processError(e)
      });
    }
    else {
      this.queryForm.markAllAsTouched();
    }
  }

  PilaChange(pilaId: number) {
    // this.GetPanosToSelect(pilaId);
    this.GetNodosToSelect(pilaId, this._zonaSelected.id);
  }

  // PanoChange(pilaId: number) {
  //   this.GetNodosToSelect(pilaId);
  // }

  GetZonasToSelect() {
    this._serviceZona.getSelect().subscribe({
      next: (data) => {
        this._dataZona = data;
        if (data.length > 0) {
          this.queryForm.get('zonaId')?.enable();
        }
        else {
          this.queryForm.get('zonaId')?.disable();
        }
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetPilasToSelect() {
    this._servicePila.getSelect().subscribe({
      next: (data) => {
        this._dataPila = data;
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetPanosToSelect(pilaId: number) {
    this._servicePano.getSelect(pilaId).subscribe({
      next: (data) => {
        this._dataPano = data;
        if (data.length > 0) {
          this.queryForm.get('panoId')?.enable();
        }
        else {
          this.queryForm.get('panoId')?.disable();
        }
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetNodosToSelect(pilaId: number, zonaId: number) {
    this._serviceNodo.getSelect(pilaId, zonaId).subscribe({
      next: (data) => {
        this._dataNodo = data;
        if (data.length > 0) {
          this.queryForm.get('nodoId')?.enable();
        }
        else {
          this.queryForm.get('nodoId')?.disable();
        }
      },
      error: (e) => this._util.processError(e)
    });
  }

  ZonaChange(zonaId: any) {
    this._zonaSelected = this._dataZona.find(x => {
      return x.id == zonaId;
    });

    if (this._zonaSelected.text == "PILA") {
      this.queryForm.get('pilaId')?.addValidators(Validators.required);
      this.GetPilasToSelect();
    }
    else {
      this.queryForm.get('pilaId')?.removeValidators(Validators.required);
      this.GetNodosToSelect(0, zonaId);

    }
    this.queryForm.get('pilaId')?.updateValueAndValidity();
  }
}
