import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Services
import { PilaService } from 'src/app/services/pila.service';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { UtilsService } from 'src/app/services/utils.service';
import { MapNodoComponent } from '../configuracion/map-nodo/map-nodo.component';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  @ViewChild(MapNodoComponent ) child: MapNodoComponent ; 
  userData: any;
  pilaId: number;

  // FORM
  queryForm: FormGroup;

  // SELECT DATA
  _dataPila: any[];
  dataSource2: any;

  // CHILD
  

  constructor(
    private formBuilder: FormBuilder,
    private _servicePila: PilaService,
    private _util: UtilsService,
    private _dynamoDB: DynamodbService) {
    this.CreateForm();
  }

  ngOnInit(): void {
    this.GetPilasToSelect();
  }

  CreateForm() {
    this.queryForm = this.formBuilder.group({
      pilaId:[0, [Validators.required, Validators.min(1)]]
    });
  }

  GetPilasToSelect() {
    this._servicePila.getSelect().subscribe({
      next: (data) => {
        this._dataPila = data;
        this.pilaId = this._dataPila[0].id;
      },
      error: (e) => this._util.processError(e)
    });
  }

  PilaChange(pilaId: number) {
    this.pilaId = pilaId;
    this.child.getNodoInfoMap(pilaId);
  }

  onSubmit(): void {
    if (this.queryForm.valid) {
      const formValues = <any>this.queryForm.getRawValue();
      this._dynamoDB.FilterByTipoNodo(formValues.from, formValues.to, formValues.tipoNodoId, formValues.pilaId).subscribe({
        next: (data) => {
          this.dataSource2 = data.valores.map((obj: any) => ({ ...obj, valorSensor: JSON.parse(obj.valor) }));
        },
        error: (e) => this._util.processError(e)
      });
    }
    else {
      this.queryForm.markAllAsTouched();
    }
  }
}
