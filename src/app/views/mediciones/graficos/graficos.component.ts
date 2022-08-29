import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData,  ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
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
    labels: [ 'Nodo1', 'Nodo2', 'Nodo3', 'Nodo4', 'Nodo5', 'Nodo6', 'Nodo7' ],
    datasets: [
      { data: [ 0.65, 0.59, 0.80, 0.81, 0.56, 0.55, 0.40 ], label: 'o2' },
      { data: [ 0.28, 0.48, 0.40, 0.19, 0.86, 0.27, 0.90 ], label: 'Co2' }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
