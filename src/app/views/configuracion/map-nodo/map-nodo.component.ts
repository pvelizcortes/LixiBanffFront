import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service'

import { GlobalConstants } from '../../../constants/global-constants';
import { Nodo } from '../../../shared/nodo';

import { DynamodbService } from '../../../services/dynamodb.service';

import { } from 'googlemaps';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-map-nodo',
  templateUrl: './map-nodo.component.html',
  styleUrls: ['./map-nodo.component.scss']
})

export class MapNodoComponent implements OnInit {
  dataObject: Nodo; // Principal Object
  // Properties
  _title: string = '';
  _entity: string = 'Nodo';
  _saveButtonName: string = GlobalConstants.saveButtonName;
  _closeButtonName: string = GlobalConstants.closeButtonName;
  _isNew: boolean = true;
  // Form
  queryForm: FormGroup;
  // Select Data
  _dataPila: any[];
  _dataZona: any[];
  _cantidadMediciones: any[];
  _previewMediciones: any[];

  _zonaSelected: any;
  _medicionesChange: boolean = false;
  selectedNodo: any;
  selectedValores: any;

  // Maps
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;
  _markers: any[];
  _nodosMap: any[];
  _valoresMap: any[];

  // ** Constructor **
  constructor(
    private _util: UtilsService,
    private route: ActivatedRoute,
    private _dynamoService: DynamodbService) {
    // Constructor
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getNodoInfoMap(params['id']);
    });
  }

  getNodoInfoMap(pilaId: any) {
    this._dynamoService.GetPilaData(pilaId).subscribe({
      next: (data) => {
        console.log(data);
        this._nodosMap = data.nodos;
        this._valoresMap = data.valores.map((obj: any) => ({ ...obj, valorSensor: JSON.parse(obj.valor) }));
        // MAP
        setTimeout(() => {
          this.CreateMap();
        }, 1000);
      },
      error: (e) => this._util.processError(e)
    });
  }

  // MAP
  CreateMap() {
    var map = new google.maps.Map(this.mapElement.nativeElement);
    this.map = map;
    var initPosition = new google.maps.LatLng(this._nodosMap[0].latLongNodo.split(',')[0], this._nodosMap[0].latLongNodo.split(',')[1]);
    this.centerInPoint(initPosition, 19);

    // Set Markers
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < this._nodosMap.length; i++) {

      var image = {
        url: '',
        size: new google.maps.Size(100, 100),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(50, 50)
      };

      if (this._nodosMap[i].tipoNodo.nombreTipoNodo == "NODO VERTICAL")
        image.url = "https://www.tecnodret.es/wp-content/uploads/2017/02/map-marker-icon-768x768.png"
      if (this._nodosMap[i].tipoNodo.nombreTipoNodo == "NODO HORIZONTAL")
        image.url = "https://cdn-icons-png.flaticon.com/512/4467/4467108.png"

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(this._nodosMap[i].latLongNodo.split(',')[0], this._nodosMap[i].latLongNodo.split(',')[1]),
        map: this.map,
        icon: image,
        label: {text: this._nodosMap[i].nombreNodo, color: "white"}
      });

      // process multiple info windows
      ((marker, i) => {
        // add click event
        google.maps.event.addListener(marker, 'click', () => {
          this.returnInfoWindowHtml(this._nodosMap[i]);          
        });
      })(marker, i);
    }
  }

  returnInfoWindowHtml(data: any) {
    this.selectedNodo = data;
    let filtrados = this._valoresMap.filter(x => x.idNodo == data.nodoId);
    this.selectedValores = filtrados;
  }

  centerInPoint(position: google.maps.LatLng, _zoom: number = this.map.getZoom()) {
    const mapProperties = {
      center: position,
      zoom: _zoom,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    this.map.setOptions(mapProperties);
  }

  Cerrar(){
    this.selectedNodo = null;
  }
  // END MAPS
}
