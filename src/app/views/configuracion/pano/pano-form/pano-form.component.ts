import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { Pano } from '../../../../shared/pano';
import { PanoService } from '../../../../services/pano.service';

@Component({
  selector: 'app-pano-form',
  templateUrl: './pano-form.component.html',
  styleUrls: ['./pano-form.component.scss']
})

export class PanoFormComponent implements OnInit {
  dataObject: Pano; // Principal Object
  // Properties
  _title: string = '';
  _entity: string = 'Pano';
  _saveButtonName: string = GlobalConstants.saveButtonName;
  _closeButtonName: string = GlobalConstants.closeButtonName;
  _isNew: boolean = true;
  // Form
  queryForm: FormGroup;

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<PanoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pano,
    private formBuilder: FormBuilder,
    private _service: PanoService,
    private _util: UtilsService) {
    this.CreateForm();
    data ? this.Editing(data) : this.Creating();
  }
  ngOnInit(): void {

  }
  CreateForm() {
    this.queryForm = this.formBuilder.group({
      panoId: [0],
      posicionPano: [0, [Validators.required]],
      codigoPano: ['', [Validators.required]],
      nombrePano: ['', [Validators.required]],
      cantidadPanos: [0],
      anchoPano: [0],
      largoPano: [0],
      descripcionPano: [''],
      ubicacionPano: [''],
      latLongPano: [''],
      active: [true]
    });
  }
  Creating() {
    this._title = 'Creando nuevo ' + this._entity;
  }
  Editing(_obj: Pano) {
    this._isNew = false;
    this.dataObject = Object.assign({}, _obj);
    this._title = 'Editando ' + this._entity + ': ' + this.dataObject.nombrePano;
    this.queryForm.patchValue(
      {
        panoId: this.dataObject.panoId,
        posicionPano: this.dataObject.posicionPano,
        codigoPano: this.dataObject.codigoPano,
        nombrePano: this.dataObject.nombrePano,
        cantidadPanos: this.dataObject.cantidadPanos,
        anchoPano: this.dataObject.anchoPano,
        largoPano: this.dataObject.largoPano,
        descripcionPano: this.dataObject.descripcionPano,
        ubicacionPano: this.dataObject.ubicacionPano,
        latLongPano: this.dataObject.latLongPano,
        active: this.dataObject.active
      }
    );
    this.DisableInputs();
  }
  DisableInputs() {
    this.queryForm.get('codigoPano')?.disable();
  }

  activar() {
    const formValues = <Pano>this.queryForm.getRawValue();
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
      const formValues = <Pano>this.queryForm.getRawValue();
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
}
