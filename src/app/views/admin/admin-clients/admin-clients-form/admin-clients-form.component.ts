import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalConstants } from '../../../../constants/global-constants';
import { Client } from 'src/app/shared/client';

import { AdminClientsFormService } from './admin-clients-form.service'

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
  // Form
  queryForm: FormGroup;

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<AdminClientsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private formBuilder: FormBuilder,
    private _service: AdminClientsFormService) {

    data ? this.Editing(data) : this.Creating();
    this.queryForm = this.formBuilder.group({
      clienteId: [0],
      nombreCliente: ['', Validators.required],
      correoCliente: ['', Validators.required, Validators.email],
      telefonoCliente: [''],
      direccionCliente: [''],
      descripcionCliente: [''],
      active: [true]
    });
  }

  ngOnInit(): void {
  }

  Creating() {
    this._title = 'Creando nuevo ' + this._entity;
  }

  Editing(_obj: Client) {
    this.dataObject = Object.assign({}, _obj);
    this._title = 'Editando ' + this._entity + ': ' + this.dataObject.NombreCliente;
  }

  onSubmit(): void {
    const query = <Client>this.queryForm.getRawValue();
    this._service.getControlSummary(query)
  }

  closeMe() {
    this.dialogRef.close(this.dataObject);
  }
}
