import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { Pila } from '../../../../shared/pila';
import { PilaService } from '../../../../services/pila.service';

import { } from 'googlemaps';
// import { Observable, timeout } from 'rxjs';

@Component({
  selector: 'app-pila-form',
  templateUrl: './pila-form.component.html',
  styleUrls: ['./pila-form.component.scss']
})

export class PilaFormComponent implements OnInit {
  dataObject: Pila; // Principal Object
  // Properties
  _title: string = '';
  _entity: string = 'Pila';
  _saveButtonName: string = GlobalConstants.saveButtonName;
  _closeButtonName: string = GlobalConstants.closeButtonName;
  _isNew: boolean = true;
  // Form
  queryForm: FormGroup;

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<PilaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pila,
    private formBuilder: FormBuilder,
    private _service: PilaService,
    private _util: UtilsService) {
    this.CreateForm();
    data ? this.Editing(data) : this.Creating();
  }
  ngOnInit(): void {
  }

  CreateForm() {
    this.queryForm = this.formBuilder.group({
      pilaId: [0],
      //posicionPila: [0, [Validators.required]],
      codigoPila: ['', [Validators.required]],
      nombrePila: ['', [Validators.required]],
      anchoPila: [0, [Validators.required]],
      largoPila: [0, [Validators.required]],
      altoPila: [0],
      descripcionPila: [''],
      ubicacionPila: [''],
      latLongPila: [''],
      latitudPila: [''],
      longitudPila: [''],
      active: [true]
    });
  }

  Creating() {
    this._title = 'Creando nuevo ' + this._entity;
  }

  Editing(_obj: Pila) {
    this._isNew = false;
    this.dataObject = Object.assign({}, _obj);
    this._title = 'Editando ' + this._entity + ': ' + this.dataObject.nombrePila;
    this.queryForm.patchValue(
      {
        pilaId: this.dataObject.pilaId,      
        codigoPila: this.dataObject.codigoPila,
        nombrePila: this.dataObject.nombrePila,
        anchoPila: this.dataObject.anchoPila,
        largoPila: this.dataObject.largoPila,
        altoPila: this.dataObject.altoPila,
        descripcionPila: this.dataObject.descripcionPila,
        ubicacionPila: this.dataObject.ubicacionPila,
        latLongPila: this.dataObject.latLongPila,
        active: this.dataObject.active
      }
    );
    this.DisableInputs();
  }

  DisableInputs() {
    this.queryForm.get('codigoPila')?.disable();
  }

  activar() {
    const formValues = <Pila>this.queryForm.getRawValue();
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
    var mapCheck = <any>this.queryForm.getRawValue();
    // if (mapCheck.latitudPila != '' && mapCheck.longitudPila != '') {
      if (this.queryForm.valid) {
        const formValues = <Pila>this.queryForm.getRawValue();
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
    // }
    // else {
    //   this._util.alertError('Por favor ubique la pila en el mapa', `Mantenedor de ${this._entity}:`);
    // }
  }

  closeMe() {
    this.dialogRef.close(this.dataObject);
  }
}
