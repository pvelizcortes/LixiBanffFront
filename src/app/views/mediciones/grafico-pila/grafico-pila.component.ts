import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from '../../../constants/global-constants';
import { UtilsService } from '../../../services/utils.service'
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';

// Services
import { PilaService } from 'src/app/services/pila.service';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { ZonaService } from 'src/app/services/zona.service';

// Mat Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter'; // No Borrar

// Export PDF
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Chart

@Component({
  selector: 'app-grafico-pila',
  templateUrl: './grafico-pila.component.html',
  styleUrls: ['./grafico-pila.component.scss']
})

export class GraficoPilaComponent implements OnInit {
  // PRINCIPAL PROPERTIES
  _entity: string = 'Pila';
  _title: string = 'Grafico ' + this._entity + ' (promedio por día)';
  _createName: string = GlobalConstants.createButtonName;
  _searchText: string = GlobalConstants.searchPlaceHolder;
  _pageSizeOptions: number[] = GlobalConstants.pageSizeOptions;
  _noSearchResults: string = GlobalConstants.noSearchResults;
  _showModal: boolean = false;
  // MAT TABLE
  displayedColumns: string[] = ['fecha', 'nodo', 'sensor', 'valor', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('tableSort') tableSort = new MatSort();
  // FORM
  queryForm: FormGroup;
  // SELECT DATA
  _dataPila: any[];
  _dataVariables: any[];
  dataSource2: any;

  _dataZona: any[];
  _zonaSelected: any;

  // GRAFICO
  showChart: boolean = true;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'left'
      }
    }
  };

  public barChartType: ChartType = 'line';
  public barChartData: ChartData<'line'> = {
    labels: [],
    datasets: []        
  };

  constructor(
    private formBuilder: FormBuilder,
    private _util: UtilsService,
    private _servicePila: PilaService,
    private _serviceZona: ZonaService,
    private _dynamoDB: DynamodbService) {
    this.CreateForm();
  }

  ngOnInit(): void {
    this.GetZonasToSelect();
    this.GetVariables();
  }

  CreateForm() {
    this.queryForm = this.formBuilder.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      pilaId:  [0, [Validators.required, Validators.min(1)]],  // FK
      zonaId: [0, [Validators.required, Validators.min(1)]],  // FK
      variableId: [0],  // FK
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.tableSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ExportPDF() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#principalTable' });
    doc.save(this._title + '.pdf')
  }

  // onSubmit(): void {
  //   this.showChart = false;
  //   if (this.queryForm.valid) {
  //     const formValues = <any>this.queryForm.getRawValue();
  //     this._dynamoDB.getChartData(formValues.from, formValues.to, formValues.pilaId, formValues.variableId).subscribe({
  //       next: (data) => {
  //         this.dataSource2 = data.valores.map((obj: any) => ({ ...obj, valorSensor: JSON.parse(obj.valor) }));
  //         this.barChartData.datasets = [];
  //         // Buscar Nodos
  //         const conjuntoDeCombinaciones = new Set<string>();
  //         const arrayDeObjetosDistintos = this.dataSource2.filter((objeto: any) => {
  //           const combinacion = `${objeto.nombreNodo}-${objeto.sensor}`;
  //           if (conjuntoDeCombinaciones.has(combinacion)) {
  //             return false;
  //           }
  //           conjuntoDeCombinaciones.add(combinacion);
  //           return true;
  //         });

  //         // Dias
  //         var arrayOfDates = this.createDates(formValues.from, formValues.to);
  //         this.barChartData.labels = [];
  //         arrayOfDates.forEach((fecha:string) => {
  //           this.barChartData.labels?.push(fecha);
  //         });  

  //         // Recorrer Sensores
  //         arrayDeObjetosDistintos.forEach((s:any) => {
            
  //           var dataObject:any = [];
  //           // Recorrer Días
  //           arrayOfDates.forEach((fecha:string) => {             
  //             const resultsPerDay = this.dataSource2.filter((item : any)=> item.time == fecha && item.sensor == s.sensor);
  //             if (resultsPerDay.length == 0){
  //               dataObject.push(0)    
  //             }
  //             else{
  //               const sum = resultsPerDay.reduce((acc:any, val:any) => acc + parseFloat(val.valorSensor.Value), 0);
  //               const average = sum / resultsPerDay.length;
  //               dataObject.push(average)    
  //             }
  //           }); 
  //           this.barChartData.datasets.push({ data: dataObject, label: s.sensor + ' (' + s.nombreNodo + ')'   });         
  //           this.showChart = true;
  //         });
  //       },
  //       error: (e) => this._util.processError(e)
  //     });
  //   }
  //   else {
  //     this.queryForm.markAllAsTouched();
  //   }
  // }

  onSubmit(): void {
    this.showChart = false;
    if (this.queryForm.valid) {
      const formValues = <any>this.queryForm.getRawValue();
      this._dynamoDB.getChartData(formValues.from, formValues.to, formValues.pilaId, formValues.variableId).subscribe({
        next: (data) => {
          this.dataSource2 = data.valores.map((obj: any) => ({ ...obj, valorSensor: JSON.parse(obj.valor) }));
          this.barChartData.datasets = [];
          // Buscar Nodos
          const conjuntoDeCombinaciones = new Set<string>();
          const arrayDeObjetosDistintos = this.dataSource2.filter((objeto: any) => {
            const combinacion = `${objeto.nombreNodo}-${objeto.sensor}`;
            if (conjuntoDeCombinaciones.has(combinacion)) {
              return false;
            }
            conjuntoDeCombinaciones.add(combinacion);
            return true;
          });

          // Dias
          var arrayOfDates = this.createDates(formValues.from, formValues.to);
          this.barChartData.labels = [];
          arrayOfDates.forEach((fecha:string) => {
            this.barChartData.labels?.push(fecha);
          });  

          // Recorrer Sensores
          arrayDeObjetosDistintos.forEach((s:any) => {
            
            var dataObject:any = [];
            // Recorrer Días
            arrayOfDates.forEach((fecha:string) => {             
              const resultsPerDay = this.dataSource2.filter((item : any)=> item.time == fecha && item.sensor == s.sensor);
              if (resultsPerDay.length == 0){
                dataObject.push(0)    
              }
              else{
                const sum = resultsPerDay.reduce((acc:any, val:any) => acc + parseFloat(val.valorSensor.Value), 0);
                const average = sum / resultsPerDay.length;
                dataObject.push(average)    
              }
            }); 
            this.barChartData.datasets.push({ data: dataObject, label: s.sensor + ' (' + s.nombreNodo + ')'   });         
            this.showChart = true;
          });
        },
        error: (e) => this._util.processError(e)
      });
    }
    else {
      this.queryForm.markAllAsTouched();
    }
  }

  createDates(startDate: Date, endDate: Date) {
    const dates = [];
    let currentDate = new Date(startDate);
    let finalDate = new Date(endDate);

    while (currentDate <= finalDate) {
      dates.push(this.formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  formatDate(date:Date) {
    const day = (date.getDate() + 1).toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
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
      },
      error: (e) => this._util.processError(e)
    });
  }

  GetVariables(){
    this._dataVariables = [{id:'o2', text:'O2'}, {id: 'co2', text:'CO2'}, {id: 'n20', text:'N20'}, {id: '%', text:'Humedad'}];
  }

  GetPilasToSelect() {
    this._servicePila.getSelect(0).subscribe({
      next: (data) => {
        this._dataPila = data;
      },
      error: (e) => this._util.processError(e)
    });
  }  

  ZonaChange(zonaId: any) {
    this._zonaSelected = this._dataZona.find(x => {
      return x.id == zonaId;
    });

    if (this._zonaSelected.text == "PILA") {
      this.queryForm.get('pilaId')?.addValidators(Validators.required);
      this.GetPilasToSelect();
    }
    else {
      this.queryForm.get('pilaId')?.removeValidators(Validators.required);
    }
    this.queryForm.get('pilaId')?.updateValueAndValidity();
  }
}
