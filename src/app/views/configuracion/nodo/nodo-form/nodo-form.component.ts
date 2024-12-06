import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { Nodo } from '../../../../shared/nodo';

import { NodoService } from '../../../../services/nodo.service';
import { PilaService } from '../../../../services/pila.service';
import { ZonaService } from 'src/app/services/zona.service';

import { } from 'googlemaps';


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
  _idProyecto: number = 0;
  // Form
  queryForm: FormGroup;
  // Select Data
  _dataPila: any[];
  _dataTipoNodo: any[];
  _dataZona: any[];
  _cantidadMediciones: any[];
  _previewMediciones: any[];

  _zonaSelected: any;
  _medicionesChange: boolean = false;

  // Maps
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;

  // ** Constructor **
  constructor(public dialogRef: MatDialogRef<NodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _service: NodoService,
    private _servicePila: PilaService,
    private _serviceZona: ZonaService,
    private _util: UtilsService) {
    this.CreateForm();
    this._idProyecto = data.idProyecto;
    data.nodo ? this.Editing(data.nodo) : this.Creating();
  }

  ngOnInit(): void {
    this.GetZonasToSelect();
    this.GetPilasToSelect();
    this.GetTipoNodoToSelect();
    // MAP
    setTimeout(() => {
      this.CreateMap();
    }, 1000);
  }

  // MAP
  CreateMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement);
    this.marker = new google.maps.Marker({
      map: this.map
    });
    this.centerInPoint(GlobalConstants.initMapLatLng, 16);
    this.map.addListener("click", (mapsMouseEvent) => {
      this.centerInPoint(mapsMouseEvent.latLng);
    });
    if (!this._isNew) {
      var latLng = this.dataObject.latLongNodo.split(',');
      var glatlng = new google.maps.LatLng(Number(latLng[0]), Number(latLng[1]));
      this.centerInPoint(glatlng, 20);
    }
  }
  buscarGPS() {
    const formValues = <any>this.queryForm.getRawValue();
    this.centerInPoint(new google.maps.LatLng(Number(formValues.latitudNodo), Number(formValues.longitudNodo)));
  }
  centerInPoint(position: google.maps.LatLng, _zoom: number = this.map.getZoom()) {
    this.marker.setPosition(position);
    var jsonPosition = position.toJSON();
    this.queryForm.controls['latitudNodo'].setValue(jsonPosition.lat);
    this.queryForm.controls['longitudNodo'].setValue(jsonPosition.lng);
    this.queryForm.controls['latLongNodo'].setValue(jsonPosition.lat.toString() + ',' + jsonPosition.lng.toString());
    const mapProperties = {
      center: position,
      zoom: _zoom,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    this.map.setOptions(mapProperties);
  }
  // END MAPS

  GetPilasToSelect() {
    this._servicePila.getSelect(this._idProyecto).subscribe({
      next: (data) => {
        this._dataPila = data;
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetZonasToSelect() {
    this._serviceZona.getSelect().subscribe({
      next: (data) => {
        this._dataZona = data;
        if (data.length > 0) {
          this.queryForm.get('zonaId')?.enable();
        }
        else {
          this.queryForm.get('zonaId')?.disable();
        }
        if (!this._isNew) {
          this._zonaSelected = this._dataZona.find(x => {
            return x.id == this.dataObject.zonaId;
          });
        }
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetTipoNodoToSelect() {
    this._service.getTipoNodoSelect(this._idProyecto).subscribe({
      next: (data) => {
        this._dataTipoNodo = data;
      },
      error: (e) => this._util.processError(e)
    });
  }
  
  CreateForm() {
    this.queryForm = this.formBuilder.group({
      nodoId: [0],  // PK
      pilaId: [0, [Validators.required]],  // FK
      panoId: [0],  // FK
      tipoNodoId: [0, [Validators.required, Validators.min(1)]],  // FK
      zonaId: [0],  // FK
      posicionNodo: [0, [Validators.required]],
      codigoNodo: ['', [Validators.required]],
      nombreNodo: ['', [Validators.required]],
      mac: [''],
      latLongNodo: [''],
      latitudNodo: [''],
      longitudNodo: [''],
      active: [true],
      clienteId: [0]
    });
  }

  Creating() {
    this._title = 'Creando nuevo ' + this._entity;
    this.queryForm.patchValue({
      clienteId: Number(this._idProyecto)
    })
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
        zonaId: this.dataObject.zonaId,
        panoId: this.dataObject.panoId,
        tipoNodoId: this.dataObject.tipoNodoId,
        posicionNodo: this.dataObject.posicionNodo,
        codigoNodo: this.dataObject.codigoNodo,
        nombreNodo: this.dataObject.nombreNodo,
        mac: this.dataObject.mac,
        active: this.dataObject.active,
        latLongNodo: this.dataObject.latLongNodo,
        clienteId: this.dataObject.clienteId
      }
    );
    this.DisableInputs();
    //this.TipoNodoChange(this.dataObject.tipoNodoId ? this.dataObject.tipoNodoId : 0);
    this.GetMediciones(this.dataObject.nodoId);
  }

  GetMediciones(nodoId: number) {
    this._cantidadMediciones = new Array(0);
    this._service.getMediciones(nodoId).subscribe({
      next: (data) => {
        this._cantidadMediciones = [...data];
        this._previewMediciones = [...data];
      },
      error: (e) => this._util.processError(e)
    });
  }

  TipoNodoChange(tipoNodoId: number) {
    this._cantidadMediciones = new Array(0);
    this._service.getTipoNodo(tipoNodoId).subscribe({
      next: (data) => {
        data.niveles.forEach((x: any) => {
          for (let index = 0; index < x.cantidadMac; index++) {
            this._cantidadMediciones.push({
              posicionSensor: x.posicion,
              mac: '',
              // descripcion: '',
              sensores: '',
            })
          }        
        });
        this.MedicionChange();
      },
      error: (e) => this._util.processError(e)
    });
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
          if (this._isNew || this._medicionesChange) {
            this.dataObject = data.nodo;
            this.saveMediciones();
          }
          else {
            this.closeMe();
          }
        },
        error: (e) => this._util.processError(e)
      });
    }
    else {
      this.queryForm.markAllAsTouched();
    }
  }

  saveMediciones(): void {
    this._service.saveMediciones(this.dataObject, this._cantidadMediciones).subscribe({
      next: (data) => {
        this._util.alertSuccess(data.message, `Mediciones del Nodo`);
        this.closeMe();
      },
      error: (e) => this._util.processError(e)
    });
  }

  closeMe() {
    this.dialogRef.close(this.dataObject);
  }

  ZonaChange(zonaId: any) {
    this._zonaSelected = this._dataZona.find(x => {
      return x.id == zonaId;
    });

    if (this._zonaSelected.text == "PILA") {
      this.queryForm.get('pilaId')?.addValidators(Validators.required);
    }
    else {
      this.queryForm.get('pilaId')?.removeValidators(Validators.required);
    }
    this.queryForm.get('pilaId')?.updateValueAndValidity();
  }

  MedicionChange() {
    this._medicionesChange = true;
  }
}
