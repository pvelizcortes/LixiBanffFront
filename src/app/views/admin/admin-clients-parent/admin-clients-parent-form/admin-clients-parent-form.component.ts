import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { ClientePadre } from 'src/app/shared/clientePadre';
import { AdminClientParentService } from '../../../../services/admin-client-parent.service';
import { NodoService } from '../../../../services/nodo.service';

@Component({
  selector: 'app-admin-clients-parent-form',
  templateUrl: './admin-clients-parent-form.component.html',
  styleUrls: ['./admin-clients-parent-form.component.scss']
})

export class AdminClientsParentFormComponent implements OnInit {
  dataObject: ClientePadre; // Principal Object
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

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<AdminClientsParentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientePadre,
    private formBuilder: FormBuilder,
    private _service: AdminClientParentService,
    private toastr: ToastrService,
    private _util: UtilsService) {
    this.CreateForm();
    data ? this.Editing(data) : this.Creating();
  }
  ngOnInit(): void {
  }
  CreateForm() {
    this.queryForm = this.formBuilder.group({
      clientePadreId: [0],
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
  Editing(_obj: ClientePadre) {
    this._isNew = false;
    this.dataObject = Object.assign({}, _obj);
    this._title = 'Editando ' + this._entity + ': ' + this.dataObject.nombreCliente;
    this.queryForm.patchValue(
      {
        nombreCliente: this.dataObject.nombreCliente,
        clientePadreId: this.dataObject.clientePadreId,
        correoCliente: this.dataObject.correoCliente,
        telefonoCliente: this.dataObject.telefonoCliente,
        direccionCliente: this.dataObject.direccionCliente,
        descripcionCliente: this.dataObject.descripcionCliente,
        active: this.dataObject.active
      }
    );
    this.DisableInputs();
  }
  DisableInputs() {
    this.queryForm.get('nombreCliente')?.disable();
  }

  activar() {
    const formValues = <ClientePadre>this.queryForm.getRawValue();
    formValues.active = true;
    this._service.save(formValues).subscribe(data => {
      this.toastr.success(`${this._entity} activado con éxito.`, `Mantenedor de ${this._entity}:`);
      this.closeMe();
    });
  }

  onSubmit(): void {
    if (this.queryForm.valid) {
      const formValues = <ClientePadre>this.queryForm.getRawValue();
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
