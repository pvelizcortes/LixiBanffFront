import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { Alerta } from '../../../../shared/alerta';
import { AlertaService } from '../../../../services/alerta.service';
import { PilaService } from '../../../../services/pila.service';
import { NodoService } from 'src/app/services/nodo.service';

@Component({
  selector: 'app-alerta-form',
  templateUrl: './alerta-form.component.html',
  styleUrls: ['./alerta-form.component.scss']
})

export class AlertaFormComponent implements OnInit {
  // Principal Object
  dataObject: Alerta;
  // Properties
  _title: string = '';
  _entity: string = 'Alerta';
  _saveButtonName: string = GlobalConstants.saveButtonName;
  _closeButtonName: string = GlobalConstants.closeButtonName;
  _isNew: boolean = true;
  // Form
  queryForm: FormGroup;
  // Select Data
  _dataPila: any[];
  _dataTipoNodo: any[];
  _dataOperador: any[];

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<AlertaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alerta,
    private formBuilder: FormBuilder,
    private _service: AlertaService,
    private _servicePila: PilaService,
    private _serviceNodo: NodoService,
    private _util: UtilsService) {
    this.CreateForm();
    data ? this.Editing(data) : this.Creating();
  }
  ngOnInit(): void {
    this.GetPilasToSelect();
    this.GetTipoNodoToSelect();
    this.GetOperadorToSelect();
  }

  CreateForm() {
    this.queryForm = this.formBuilder.group({
      alertaId: [0],
      codigoAlerta: ['', [Validators.required]],
      nombreAlerta: [''],
      descripcionAlerta: [''],
      correoAlerta: ['', [Validators.required]],
      tipoNodoId: [0, [Validators.required, Validators.min(1)]],  // FK
      pilaId: [0, [Validators.required, Validators.min(1)]],  // FK
      medicion: ['', [Validators.required]],
      operador: ['', [Validators.required]],
      valor: [0, [Validators.required]],
      active: [true]
    });
  }

  Creating() {
    this._title = 'Creando nuevo ' + this._entity;
  }

  Editing(_obj: Alerta) {
    this._isNew = false;
    this.dataObject = Object.assign({}, _obj);
    this._title = 'Editando ' + this._entity + ': ' + this.dataObject.codigoAlerta;
    this.queryForm.patchValue(
      {
        alertaId: this.dataObject.alertaId,
        codigoAlerta: this.dataObject.codigoAlerta,
        nombreAlerta: this.dataObject.nombreAlerta,
        descripcionAlerta: this.dataObject.descripcionAlerta,
        correoAlerta: this.dataObject.correoAlerta,
        tipoNodoId: this.dataObject.tipoNodoId,
        pilaId: this.dataObject.pilaId,
        medicion: this.dataObject.medicion,
        operador: this.dataObject.operador,
        valor: this.dataObject.valor,
        active: this.dataObject.active
      }
    );
    this.DisableInputs();
  }

  DisableInputs() {
    this.queryForm.get('codigoAlerta')?.disable();
  }

  activar() {
    const formValues = <Alerta>this.queryForm.getRawValue();
    formValues.active = true;
    this._service.save(formValues, this._isNew).subscribe({
      next: (data) => {
        this._util.alertSuccess(`${this._entity} activado con éxito.`, `Mantenedor de ${this._entity}:`);
        this.closeMe();
      },
      error: (e) => this._util.processError(e)
    });
  }

  onSubmit(): void {
    if (this.queryForm.valid) {
      const formValues = <Alerta>this.queryForm.getRawValue();
      this._service.save(formValues, this._isNew).subscribe({
        next: (data) => {
          this._util.alertSuccess(data.message, `Mantenedor de ${this._entity}:`);
          this.closeMe();
        },
        error: (e) => this._util.processError(e)
      });
    }
    else {
      this.queryForm.markAllAsTouched();
    }
  }

  closeMe() {
    this.dialogRef.close(this.dataObject);
  }

  GetPilasToSelect() {
    this._servicePila.getSelect().subscribe({
      next: (data) => {
        this._dataPila = data;
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetTipoNodoToSelect() {
    this._serviceNodo.getTipoNodoSelect().subscribe({
      next: (data) => {
        this._dataTipoNodo = data;
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetOperadorToSelect() {
    this._dataOperador = [{ id: "1", text: "mayor que" }, { id: "2", text: "menor que" }, { id: "3", text: "igual a" }];
  }
}
