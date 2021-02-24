// Imports
import { Component, OnInit, ViewChild } from '@angular/core';

// Service import
import { GlobalApiDataService } from './../../services/global-api-data.service';

// Apex chart imports
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-global-bar-chart',
  templateUrl: './global-bar-chart.component.html',
  styleUrls: ['./global-bar-chart.component.scss']
})
export class GlobalBarChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  // Error variable will be called if request error
  error!: string;

  continentArray = [] as any;

  constructor(private globalApiDataService: GlobalApiDataService) {
    this.chartOptions = {
      series: [
        {
          name: 'Temp Confirmed',
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        },
        {
          name: 'Temp Deaths',
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        },
        {
          name: 'Temp Critical condition',
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          'South Korea',
          'Canada',
          'United Kingdom',
          'Netherlands',
          'Italy',
          'France',
          'Japan',
          'United States',
          'China',
          'Germany',
        ]
      }
    };
  }

  ngOnInit(): void {

    this.globalApiDataService.getContinentData().subscribe((data) => {
      // Place the subscribed data into continentArray
      this.continentArray = data;
      console.log(this.continentArray, 'LOG FRÅN continentArray Bar chart');
    },
    (error) => {
      this.error = error;
    });
  }



}
