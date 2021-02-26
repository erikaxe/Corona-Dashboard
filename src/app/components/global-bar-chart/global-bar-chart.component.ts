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

// Export chart options
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

  // Array containing continent
  continentArray = [] as any;

  // is chartDataLoaded ?
  chartDataLoaded = false;

  // Error variable will be called if request error
  error!: string;

  constructor(private globalApiDataService: GlobalApiDataService) {}

  // Function to update chart
  updateChartOptions(): void {
    // Variables containing the data
    const confirmed = [];
    const deaths = [];
    const recovered = [];
    const continents = [];

    // Loop through continentArray and push data to each variable
    for (const continent of this.continentArray){
      confirmed.push(continent.cases);
      deaths.push(continent.deaths);
      recovered.push(continent.recovered);
      continents.push(continent.continent);
    }

    // Chart starts
    this.chartOptions = {
      // Chart bars for each category, place variables as data
      series: [
        {
          name: 'Confirmed',
          data: confirmed
        },
        {
          name: 'Recovered',
          data: recovered
        },
        {
          name: 'Deaths',
          data: deaths
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
        // Place continents variable in chart
        categories: continents
      }
    };
    // Chart ends

    // Data is loaded show chart
    this.chartDataLoaded = true;
  }

  ngOnInit(): void {

    this.globalApiDataService.getContinentData().subscribe((data) => {
      // Place the subscribed data into continentArray
      this.continentArray = data;
      this.updateChartOptions();
      console.log(this.continentArray);
    },
    /* Catch error so we can print it in the view if needed*/
    (error) => {
      this.error = error;
    });
  }
}
