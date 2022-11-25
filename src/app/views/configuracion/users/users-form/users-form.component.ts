import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { Users } from 'src/app/shared/users';
import { UsersService } from '../../../../services/users.service';
import { AdminClientService } from 'src/app/services/admin-client.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})

export class UsersFormComponent implements OnInit {
  dataObject: Users; // Principal Object
  // Properties
  _title: string = '';
  _entity: string = 'Usuario';
  _saveButtonName: string = GlobalConstants.saveButtonName;
  _closeButtonName: string = GlobalConstants.closeButtonName;
  _isNew: boolean = true;
  _showPassword: boolean = false;
  _passwordToShow: string = '';
  // Form
  queryForm: FormGroup;
  // Select Data
  _dataPerfil: any[];
  _dataCliente: any[];

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private formBuilder: FormBuilder,
    private _service: UsersService,
    private _service_cliente: AdminClientService,
    private _util: UtilsService) {
    this.CreateForm();
    data ? this.Editing(data) : this.Creating();
  }
  ngOnInit(): void {
    this.GetPerfilToSelect();
    this.GetClienteToSelect();
  }

  GetPerfilToSelect() {
    this._service.getPerfilSelect().subscribe({
      next: (data) => {
        this._dataPerfil = data;
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetClienteToSelect() {
    this._service_cliente.getSelect().subscribe({
      next: (data) => {
        this._dataCliente = data;
      },
      error: (e) => this._util.processError(e)
    });
  }

  CreateForm() {
    this.queryForm = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.min(4)]],
      password_check: ['', [Validators.required, Validators.min(4)]],
      usuarioId: [0],
      active: [true],
      clienteId: [0, [Validators.required, Validators.min(1)]],
      correoUsuario: ['', [Validators.required, Validators.email]],
      descripcionUsuario: [''],
      perfilId: [0, [Validators.required, Validators.min(1)]],
      telefonoUsuario: [''],
      isSuperAdmin: [false],
      passwordNotEncripted: ['']
    });
  }
  Creating() {
    this._title = 'Creando nuevo ' + this._entity;
  }
  Editing(_obj: Users) {
    this._isNew = false;
    this.dataObject = Object.assign({}, _obj);
    this._title = 'Editando ' + this._entity + ': ' + this.dataObject.nombreUsuario;
    this.queryForm.patchValue(
      {
        nombreUsuario: this.dataObject.nombreUsuario,
        password: this.dataObject.passwordNotEncripted,
        password_check: this.dataObject.passwordNotEncripted,
        usuarioId: this.dataObject.usuarioId,
        active: this.dataObject.active,
        clienteId: this.dataObject.clienteId,
        correoUsuario: this.dataObject.correoUsuario,
        descripcionUsuario: this.dataObject.descripcionUsuario,
        perfilId: this.dataObject.perfilId,
        telefonoUsuario: this.dataObject.telefonoUsuario,
        isSuperAdmin: this.dataObject.isSuperAdmin,
        passwordNotEncripted: this.dataObject.passwordNotEncripted
      }
    );
    this.DisableInputs();
  }
  DisableInputs() {
    this.queryForm.get('nombreUsuario')?.disable();
    this.queryForm.get('password')?.disable();
    this.queryForm.get('password_check')?.disable();
  }

  activar() {
    const formValues = <Users>this.queryForm.getRawValue();
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
      const formValues = <Users>this.queryForm.getRawValue();
      if (formValues.password != this.queryForm.get('password_check')?.value) {
        this._util.alertWarning('Las contraseñas no coinciden', `Mantenedor de ${this._entity}:`);
        return;
      }
      formValues.passwordNotEncripted = formValues.password;
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

  enablePassword() {
    this.queryForm.get('password')?.enable();
    this.queryForm.get('password_check')?.enable();
  }
}
