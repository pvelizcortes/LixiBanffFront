import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { Nodo } from '../../../../shared/nodo';

import { NodoService } from '../../../../services/nodo.service';
import { PilaService } from '../../../../services/pila.service';
import { PanoService } from 'src/app/services/pano.service';

import { Pila } from 'src/app/shared/pila';
import { Pano } from 'src/app/shared/pano';


@Component({
  selector: 'app-nodo-form',
  templateUrl: './nodo-form.component.html',
  styleUrls: ['./nodo-form.component.scss']
})

export class NodoFormComponent implements OnInit {
  dataObject: Nodo; // Principal Object
  // Properties
  _title: string = '';
  _entity: string = 'Nodo';
  _saveButtonName: string = GlobalConstants.saveButtonName;
  _closeButtonName: string = GlobalConstants.closeButtonName;
  _isNew: boolean = true;
  // Form
  queryForm: FormGroup;
  // Select Data
  _dataPila: any[];
  _dataPano: any[];
  _dataTipoNodo: any[];

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<NodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Nodo,
    private formBuilder: FormBuilder,
    private _service: NodoService,
    private _servicePila: PilaService,
    private _servicePano: PanoService,
    private _util: UtilsService) {
    this.CreateForm();
    data ? this.Editing(data) : this.Creating();
  }

  ngOnInit(): void {
    this.GetPilasToSelect();
    this.GetTipoNodoToSelect();
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
        if (data.length > 0){
          this.queryForm.get('panoId')?.enable();
        }
        else{
          this.queryForm.get('panoId')?.disable();
        }       
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetTipoNodoToSelect() {
    this._service.getTipoNodoSelect().subscribe({
      next: (data) => {
        this._dataTipoNodo = data;
      },
      error: (e) => this._util.processError(e)
    });
  }


  CreateForm() {
    this.queryForm = this.formBuilder.group({
      nodoId: [0],  // PK
      pilaId: [0, [Validators.required, Validators.min(1)]],  // FK
      panoId: [0, [Validators.required, Validators.min(1)]],  // FK
      tipoNodoId: [0, [Validators.required, Validators.min(1)]],  // FK
      posicionNodo: [0, [Validators.required]],
      codigoNodo: ['', [Validators.required]],
      nombreNodo: ['', [Validators.required]],
      mac: ['', [Validators.required]],
      active: [true]
    });
  }

  Creating() {
    this._title = 'Creando nuevo ' + this._entity;
    this.queryForm.controls['pilaId'].setValue(0);
    this.queryForm.controls['tipoNodoId'].setValue(0);
    this.queryForm.get('panoId')?.disable();
  }

  Editing(_obj: Nodo) {
    this._isNew = false;
    this.dataObject = Object.assign({}, _obj);
    this._title = 'Editando ' + this._entity + ': ' + this.dataObject.nombreNodo;
    this.queryForm.patchValue(
      {
        nodoId: this.dataObject.nodoId,
        pilaId: this.dataObject.pilaId,
        panoId: this.dataObject.panoId,
        tipoNodoId: this.dataObject.tipoNodoId,
        posicionNodo: this.dataObject.posicionNodo,
        codigoNodo: this.dataObject.codigoNodo,
        nombreNodo: this.dataObject.nombreNodo,
        mac: this.dataObject.mac,
        active: this.dataObject.active
      }
    );

    this.GetPanosToSelect(this.queryForm.value.pilaId);
    this.DisableInputs();
  }

  DisableInputs() {
    this.queryForm.get('codigoNodo')?.disable();
  }

  activar() {
    const formValues = <Nodo>this.queryForm.getRawValue();
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
      const formValues = <Nodo>this.queryForm.getRawValue();
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

  PilaChange(pilaId: number) {
    this.GetPanosToSelect(pilaId);
  }
}
