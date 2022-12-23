import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from '../../../../services/utils.service'

import { GlobalConstants } from '../../../../constants/global-constants';
import { Pila } from '../../../../shared/pila';
import { PilaService } from '../../../../services/pila.service';

import { } from 'googlemaps';
import { Observable, timeout } from 'rxjs';

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

  // Maps
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;

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
    setTimeout(() => {
      this.CreateMap();
    }, 1000);
  }

  CreateMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement);
    this.marker = new google.maps.Marker({
      map: this.map
    });
    this.centerInPoint(GlobalConstants.initMapLatLng);
    this.map.addListener("click", (mapsMouseEvent) => {
      this.centerInPoint(mapsMouseEvent.latLng);
    });
    if (!this._isNew) {
      var latLng = this.dataObject.latLongPila.split(',');     
      var glatlng = new google.maps.LatLng(Number(latLng[0]), Number(latLng[1]));
      this.centerInPoint(glatlng);
    }
  }

  CreateForm() {
    this.queryForm = this.formBuilder.group({
      pilaId: [0],
      posicionPila: [0, [Validators.required]],
      codigoPila: ['', [Validators.required]],
      nombrePila: ['', [Validators.required]],
      cantidadPanos: [0],
      anchoPila: [0],
      largoPila: [0],
      descripcionPila: [''],
      ubicacionPila: [''],
      latLongPila: ['', [Validators.required]],
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
        posicionPila: this.dataObject.posicionPila,
        codigoPila: this.dataObject.codigoPila,
        nombrePila: this.dataObject.nombrePila,
        cantidadPanos: this.dataObject.cantidadPanos,
        anchoPila: this.dataObject.anchoPila,
        largoPila: this.dataObject.largoPila,
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
    if (mapCheck.latitudPila != '' && mapCheck.longitudPila != '') {
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
    }
    else {
      this._util.alertError('Por favor ubique la pila en el mapa', `Mantenedor de ${this._entity}:`);
    }
  }

  closeMe() {
    this.dialogRef.close(this.dataObject);
  }

  // Maps
  buscarGPS() {
    const formValues = <any>this.queryForm.getRawValue();
    this.centerInPoint(new google.maps.LatLng(Number(formValues.latitudPila), Number(formValues.longitudPila)));
  }

  centerInPoint(position: google.maps.LatLng) {
    this.marker.setPosition(position);
    var jsonPosition = position.toJSON();
    this.queryForm.controls['latitudPila'].setValue(jsonPosition.lat);
    this.queryForm.controls['longitudPila'].setValue(jsonPosition.lng);
    this.queryForm.controls['latLongPila'].setValue(jsonPosition.lat.toString() + ',' + jsonPosition.lng.toString());
    const mapProperties = {
      center: position, // Santiago
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    this.map.setOptions(mapProperties);
  }
}
