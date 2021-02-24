// Imports
import { Component, Input, OnInit, ViewChild } from '@angular/core';

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
  public chartOptions!: Partial<ChartOptions>;

  continentArray = [] as any;

  // is chartDataLoaded ?
  chartDataLoaded = false;

  // Error variable will be called if request error
  error!: string;

  constructor(private globalApiDataService: GlobalApiDataService) {}


  updateChartOptions(): void {
    const confirmed = [];
    const deaths = [];
    const critical = [];
    const continents = [];

    // Push data to each variable
    for (const continent of this.continentArray){
      confirmed.push(continent.cases);
      deaths.push(continent.deaths);
      critical.push(continent.critical);
      continents.push(continent.continent);
    }

    this.chartOptions = {
      series: [
        {
          name: 'Confirmed',
          data: confirmed
        },
        {
          name: 'Deaths',
          data: deaths
        },
        {
          name: 'Critical condition',
          data: critical
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
        categories: continents
      }
    };
    // Data is loaded show chart
    this.chartDataLoaded = true;
  }

  ngOnInit(): void {

    this.globalApiDataService.getContinentData().subscribe((data) => {
      // Place the subscribed data into continentArray
      this.continentArray = data;
      this.updateChartOptions();
      console.log(this.continentArray, 'LOG FRÅN continentArray Bar chart');
    },
    (error) => {
      this.error = error;
    });
  }
}
