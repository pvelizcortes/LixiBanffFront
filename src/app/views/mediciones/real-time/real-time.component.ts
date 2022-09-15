import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { DatePipe } from '@angular/common';

export interface IData {
  fecha?: any;
  sensor?: any;
  valor?: any;
}

export interface IChartData {
  data: [];
  label: any;
}

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss']
})
export class RealTimeComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

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
      },
      
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  public data: Array<any> = [];
  public objFinal: Array<IData> = [];
  public objChart: Array<IChartData> = [];

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  nodeName = '';
  nodeId = '';
  nodeMac = '';

  ngOnInit(): void {
    this.getNodeInfo();
  }

  getNodeInfo() {
    const headers = { 'Authorization': 'Bearer NNSXS.EVSQSDGLJJ6ZI7S2ZDGS26TWALZWFHOHDYKG4JQ.E4KFBAZU25TRZDR3N6QI6P76OK5SPW2RXABUV7HC4QU33S3YMJKA', 'Accept': 'text/plain' }
    this.http.get('https://nam1.cloud.thethings.network/api/v3/as/applications/nododesarrollo/packages/storage/uplink_message?limit=10', { headers, responseType: 'text' })
      .subscribe(data => {
        var jsonArray = data.split('\n');
        jsonArray.forEach(x => {
          if (x.length > 2) {
            try {
              const parsedValue = JSON.parse(x.trim());
              this.nodeName = parsedValue.result.end_device_ids.application_ids.application_id;
              this.nodeId = parsedValue.result.end_device_ids.device_id;
              this.nodeMac = parsedValue.result.end_device_ids.dev_addr;
              let fecha = parsedValue.result.received_at;
              let sensor = parsedValue.result.uplink_message.decoded_payload.sensor;
              let valor = parsedValue.result.uplink_message.decoded_payload.value;

              this.objFinal.push({
                fecha: fecha,
                sensor: sensor,
                valor: valor
              })
            }
            catch (x) {

            }
          }
        });

        var Fechitas = this.objFinal.map(x => {
          return  this.datePipe.transform(x.fecha,'dd-MM-yyyy hh:mm');          
        });

        // let sensores = this.objFinal.map(x => {
        //   return x.sensor;
        // });

        let uniqueFechitas = [...new Set(Fechitas)];

        var arrayTemp1: any = [];
        var arrayTemp2: any = [];
        var arrayTemp3: any = [];
        var arrayTemp4: any = [];
        var arrayTemp5: any = [];
        var arrayTemp6: any = [];
        
        this.objFinal.forEach(x => {
          arrayTemp1.push(x.sensor == 'temp 1' ? x.valor : 0);
          arrayTemp2.push(x.sensor == 'temp 2' ? x.valor : 0);
          arrayTemp3.push(x.sensor == 'temp 3' ? x.valor : 0);
          arrayTemp4.push(x.sensor == 'CO2 1' ? x.valor : 0);
          arrayTemp5.push(x.sensor == 'CO2 2' ? x.valor : 0);
          arrayTemp6.push(x.sensor == 'CO2 3' ? x.valor : 0);
        });

        this.barChartData = {
          labels: Fechitas,
          datasets: [
            { data: arrayTemp1, label: 'temp 1' },
            { data: arrayTemp2, label: 'temp 2' },
            { data: arrayTemp3, label: 'temp 3' },
            { data: arrayTemp4, label: 'CO2 1' },
            { data: arrayTemp5, label: 'CO2 2' },
            { data: arrayTemp6, label: 'CO2 3' }
          ]
        };

      })
  }



}
