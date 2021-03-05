// Imports
import { Component, OnInit, ViewChild} from '@angular/core';

// Service import
import { ApiDataService } from './../../services/api-data.service';

// Apex chart imports
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexYAxis,
} from 'ng-apexcharts';

// Export chart options
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-user-interactive-chart',
  templateUrl: './user-interactive-chart.component.html',
  styleUrls: ['./user-interactive-chart.component.scss']
})

export class UserInteractiveChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  // Array that contains all countries from the API
  countriesArray = [] as any;

  // Array that contains the country the user selected
  country = [] as any;

  // Variables containing data to the chart
  cases = [] as any;
  recovered = [] as any;
  deaths = [] as any;

  // Force xaxis to be ApexXAxis
  xaxis = {
    categories: []
  } as ApexXAxis;

  constructor(private apiDataService: ApiDataService) {
    // Chart starts
    this.chartOptions = {
      // Chart bars for each category
      series: [
        {
          name: 'Confirmed',
          data: []
        },
        {
          name: 'Recovered',
          data: []
        },
        {
          name: 'Deaths',
          data: []
        }
      ],
      title: {
        text: 'Compare countries',
        align: 'left'
      },
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      xaxis: this.xaxis,
      yaxis: {
        title: {
          text: 'Cases'
        }
      },
    };
    // Chart ends
  }

  ngOnInit(): void {
    // Get the data from service, and subscribe
    this.apiDataService.getCountries().subscribe((data) => {
      // Place the subscribed data into countriesArray
      this.countriesArray = data;
    });
  }

  // Function that holds the country the user selected
  // tslint:disable-next-line: typedef
  getCountry(country: any){

    // Null check to get around "possible null error" on select element
    if (country.value !== null){
      this.country = country.value;
    }
  }

  // Function to get data of specified country
  getData(): void {
    // Get the specified data from the API
    this.apiDataService.getRealtimeData(this.country).subscribe((data) => {

      // Call setData and put in the data
      this.setData(data);
    });
  }

  // Update chart with new country
  setData(country: any): void {
    // Push new data
    this.cases.push(country.cases);
    this.recovered.push(country.recovered);
    this.deaths.push(country.deaths);
    // Update categories with country names
    this.xaxis.categories.push(country.country);
    // Update chart series with new data
    this.chartOptions.series = [
      {
        name: 'Confirmed',
        data: this.cases
      },
      {
        name: 'Recovered',
        data: this.recovered
      },
      {
        name: 'Deaths',
        data: this.deaths
      }
    ];
    this.chartOptions.xaxis = this.xaxis;
  }

  // Function to reset the chart
  resetChart(): void {
    // Empty the arrays
    this.cases = [];
    this.recovered = [];
    this.deaths = [];

    // "Reset" to default ApexXAxis
    this.xaxis = {
      categories: []
    } as ApexXAxis;

    // Empty series
    this.chartOptions.series = [
      {
        name: 'Confirmed',
        data: this.cases
      },
      {
        name: 'Recovered',
        data: this.recovered
      },
      {
        name: 'Deaths',
        data: this.deaths
      }
    ];
    this.chartOptions.xaxis = this.xaxis;
  }

  // Function to trigger disabled property
  // tslint:disable-next-line: typedef
  disable(){}
}
