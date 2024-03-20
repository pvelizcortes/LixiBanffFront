import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { AdminClientService } from '../../../../services/admin-client.service';
import { NodoService } from '../../../../services/nodo.service';

@Component({
  selector: 'app-admin-clients-nodo',
  templateUrl: './admin-clients-nodo.component.html',
  styleUrls: ['./admin-clients-nodo.component.scss']
})

export class AdminClientsNodoComponent implements OnInit {
  dataObject: any; // Principal Object
  // Properties
  _title: string = 'Tipos de Nodo para el Proyecto';
  _entity: string = 'Tipo Nodo Proyecto';
  _saveButtonName: string = GlobalConstants.saveButtonName;
  _closeButtonName: string = GlobalConstants.closeButtonName;
  _isNew: boolean = true;
  // Form
  queryForm: FormGroup;
  // Select Data
  _dataTipoNodo: any[];

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<AdminClientsNodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _Nodoservice: NodoService,
    private formBuilder: FormBuilder,
    private _service: AdminClientService,
    private toastr: ToastrService,
    private _util: UtilsService) {
    this.Editing(data);
  }
  ngOnInit(): void {
    this.GetTipoNodoToSelect();
  }

  Editing(_obj: any) {
    this.dataObject = Object.assign({}, _obj);
  }

  GetTipoNodoToSelect() {
    this._Nodoservice.getTipoNodoProject().subscribe({
      next: (data) => {
        data = data.map((obj: any) => ({ ...obj, isChecked: true, niveles: 0, cantMacs: [], clienteId: this.dataObject.clienteId }));
        this._dataTipoNodo = data;
      },
      error: (e) => this._util.processError(e)
    });
  }

  Generate(item: any) {
    if (item.niveles < 1){
      this._util.alertWarning('El valor tiene que ser mayor a 0', `Niveles del Nodo`);
    }
    item.cantMacs = [];
    for (let index = 1; index <= item.niveles; index++) {
      item.cantMacs.push({ posicion: index, cantidad: 1, })
    }
  }

  onSubmit(): void {
    this._dataTipoNodo = this._dataTipoNodo.map((obj: any) => ( { ...obj, cantidad : parseInt(obj.cantidad) }));
    this._Nodoservice.saveNodoConfig(this._dataTipoNodo).subscribe({
    next: (data) => {
      this._util.alertSuccess(data.message, `Niveles del Nodo`);
      this.closeMe();
    },
    error: (e) => this._util.processError(e)
  });
  } 

  closeMe() {
    this.dialogRef.close(this.dataObject);
  }

}
