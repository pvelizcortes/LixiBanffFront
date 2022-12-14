import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { GlobalConstants } from '../../../../constants/global-constants';
import { Client } from 'src/app/shared/client';
import { AdminClientService } from '../../../../services/admin-client.service';

@Component({
  selector: 'app-admin-clients-form',
  templateUrl: './admin-clients-form.component.html',
  styleUrls: ['./admin-clients-form.component.scss']
})

export class AdminClientsFormComponent implements OnInit {
  dataObject: Client; // Principal Object
  // Properties
  _title: string = '';
  _entity: string = 'Cliente';
  _saveButtonName: string = GlobalConstants.saveButtonName;
  _closeButtonName: string = GlobalConstants.closeButtonName;
  _isNew: boolean = true;
  // Form
  queryForm: FormGroup;

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<AdminClientsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private formBuilder: FormBuilder,
    private _service: AdminClientService,
    private toastr: ToastrService) {
    this.CreateForm();
    data ? this.Editing(data) : this.Creating();
  }
  ngOnInit(): void {

  }
  CreateForm() {
    this.queryForm = this.formBuilder.group({
      clienteId: [0],
      nombreCliente: ['', [Validators.required]],
      correoCliente: ['', [Validators.required, Validators.email]],
      telefonoCliente: [''],
      direccionCliente: [''],
      descripcionCliente: [''],
      active: [true]
    });
  }
  Creating() {
    this._title = 'Creando nuevo ' + this._entity;    
  }
  Editing(_obj: Client) {
    this._isNew = false;
    this.dataObject = Object.assign({}, _obj);
    this._title = 'Editando ' + this._entity + ': ' + this.dataObject.nombreCliente;
    this.queryForm.patchValue(
      {
        nombreCliente: this.dataObject.nombreCliente,
        clienteId: this.dataObject.clienteId,
        correoCliente: this.dataObject.correoCliente,
        telefonoCliente: this.dataObject.telefonoCliente,
        direccionCliente: this.dataObject.direccionCliente,
        descripcionCliente: this.dataObject.descripcionCliente,
        active: this.dataObject.active
      }
    );
    this.DisableInputs();
  }
  DisableInputs(){
    this.queryForm.get('nombreCliente')?.disable();
  }

  activar() {
    const formValues = <Client>this.queryForm.getRawValue();
    formValues.active = true;
    this._service.save(formValues).subscribe(data => {
      this.toastr.success(`${this._entity} activado con ??xito.`, `Mantenedor de ${this._entity}:`);
      this.closeMe();
    });
  }

  onSubmit(): void {
    if (this.queryForm.valid) {
      const formValues = <Client>this.queryForm.getRawValue();
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
