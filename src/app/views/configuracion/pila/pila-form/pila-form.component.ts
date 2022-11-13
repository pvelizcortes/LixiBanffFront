import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { GlobalConstants } from '../../../../constants/global-constants';
import { Pila } from '../../../../shared/pila';
import { PilaService } from '../../../../services/pila.service';

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
    private toastr: ToastrService) {
    this.CreateForm();
    data ? this.Editing(data) : this.Creating();
  }
  ngOnInit(): void {

  }
  CreateForm() {
    this.queryForm = this.formBuilder.group({
      pilaId: [0],
      nombrePila: ['', [Validators.required]],
      correoPila: ['', [Validators.required, Validators.email]],
      telefonoPila: [''],
      direccionPila: [''],
      descripcionPila: [''],
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
        nombrePila: this.dataObject.nombrePila,
        pilaId: this.dataObject.pilaId,
        correoPila: this.dataObject.correoPila,
        telefonoPila: this.dataObject.telefonoPila,
        direccionPila: this.dataObject.direccionPila,
        descripcionPila: this.dataObject.descripcionPila,
        active: this.dataObject.active
      }
    );
    this.DisableInputs();
  }
  DisableInputs(){
    this.queryForm.get('nombrePila')?.disable();
  }

  activar() {
    const formValues = <Pila>this.queryForm.getRawValue();
    formValues.active = true;
    this._service.save(formValues).subscribe(data => {
      this.toastr.success(`${this._entity} activado con éxito.`, `Mantenedor de ${this._entity}:`);
      this.closeMe();
    });
  }

  onSubmit(): void {
    if (this.queryForm.valid) {
      const formValues = <Pila>this.queryForm.getRawValue();
      if (this._isNew) {
        this._service.create(formValues).subscribe(data => {
          this.toastr.success(data.message, `Mantenedor de ${this._entity}:`);
          this.closeMe();
        });
      }
      else {
        this._service.save(formValues).subscribe(data => {
          this.toastr.success(data.message, `Mantenedor de ${this._entity}:`);
          this.closeMe();
        });
      }
    }
    else{
      this.queryForm.markAllAsTouched();
    }
  }
  closeMe() {
    this.dialogRef.close(this.dataObject);
  }
}
