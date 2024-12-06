import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { Cliente } from 'src/app/shared/cliente';
import { AdminClientService } from '../../../../services/admin-client.service';
import { NodoService } from '../../../../services/nodo.service';

@Component({
  selector: 'app-admin-clients-form',
  templateUrl: './admin-clients-form.component.html',
  styleUrls: ['./admin-clients-form.component.scss']
})

export class AdminClientsFormComponent implements OnInit {
  dataObject: Cliente; // Principal Object
  // Properties
  _title: string = '';
  _entity: string = 'Proyecto';
  _saveButtonName: string = GlobalConstants.saveButtonName;
  _closeButtonName: string = GlobalConstants.closeButtonName;
  _isNew: boolean = true;
  // Form
  queryForm: FormGroup;
  // Select Data
  _dataTipoNodo: any[];
  _clientePadreId : number;

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<AdminClientsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _Nodoservice: NodoService,
    private formBuilder: FormBuilder,
    private _service: AdminClientService,
    private toastr: ToastrService,
    private _util: UtilsService) {
    this.CreateForm();
    data._cliente ? this.Editing(data._cliente) : this.Creating(data._clientePadreId);
  }
  ngOnInit(): void {
  }
  CreateForm() {
    this.queryForm = this.formBuilder.group({
      clienteId: [0],
      clientePadreId: [0],
      nombreCliente: ['', [Validators.required]],
      correoCliente: ['', [Validators.required, Validators.email]],
      telefonoCliente: [''],
      direccionCliente: [''],
      descripcionCliente: [''],
      dbName: ['', [Validators.required]],      
      active: [true]
    });
  }
  Creating(clientePadreId: number) {
    this._title = 'Creando nuevo ' + this._entity;
    this._clientePadreId = clientePadreId;
    this.queryForm.patchValue(
      {       
        clientePadreId: clientePadreId
      }
    );
  }
  Editing(_obj: Cliente) {
    this._isNew = false;
    this.dataObject = Object.assign({}, _obj);
    this._title = 'Editando ' + this._entity + ': ' + this.dataObject.nombreCliente;
    this.queryForm.patchValue(
      {
        nombreCliente: this.dataObject.nombreCliente,
        clienteId: this.dataObject.clienteId,
        clientePadreId: this.dataObject.clientePadreId,
        correoCliente: this.dataObject.correoCliente,
        telefonoCliente: this.dataObject.telefonoCliente,
        direccionCliente: this.dataObject.direccionCliente,
        descripcionCliente: this.dataObject.descripcionCliente,
        dbName: this.dataObject.dbName,
        active: this.dataObject.active
      }
    );
    this.DisableInputs();
  }
  DisableInputs() {
    this.queryForm.get('nombreCliente')?.disable();
  }

  activar() {
    const formValues = <Cliente>this.queryForm.getRawValue();
    formValues.active = true;
    this._service.save(formValues).subscribe(data => {
      this.toastr.success(`${this._entity} activado con éxito.`, `Mantenedor de ${this._entity}:`);
      this.closeMe();
    });
  }

  onSubmit(): void {
    if (this.queryForm.valid) {      
      const formValues = <Cliente>this.queryForm.getRawValue()
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
    else {
      this.queryForm.markAllAsTouched();
    }
  }
  closeMe() {
    this.dialogRef.close(this.dataObject);
  }
}
