import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData,  ChartType } from 'chart.js';

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
      }     
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  
  constructor(private http: HttpClient) { }

  data = '';
  nodeName= '';
  nodeId= '';
  nodeMac='';

  ngOnInit(): void {
    this.getNodeInfo();
  }

  getNodeInfo() {
    const headers = { 'Authorization': 'Bearer NNSXS.EVSQSDGLJJ6ZI7S2ZDGS26TWALZWFHOHDYKG4JQ.E4KFBAZU25TRZDR3N6QI6P76OK5SPW2RXABUV7HC4QU33S3YMJKA', 'Accept': 'text/event-stream' }
    this.http.get('https://nam1.cloud.thethings.network/api/v3/as/applications/nododesarrollo/packages/storage/uplink_message?limit=10', { headers })
      .subscribe(data => {       
        const parsed = JSON.parse(JSON.stringify(data));
        console.log(parsed);

        this.nodeName = parsed.result.end_device_ids.application_ids.application_id;
        this.nodeId = parsed.result.end_device_ids.device_id;
        this.nodeMac = parsed.result.end_device_ids.dev_addr;

        var thenum = parsed.result.uplink_message.decoded_payload.value;       

        this.barChartData = {
          labels: [ parsed.result.received_at ],
          datasets: [
            { data: [ 20 ], label: 'o2' }           
          ]
        };
        this.data = JSON.stringify(data);
      })
  }

}
