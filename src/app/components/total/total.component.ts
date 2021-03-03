
// Imports
import { Component, OnInit, ViewChild } from '@angular/core';

// Service imports
import { ApiDataService } from './../../services/api-data.service';

// Chart imports
import { ChartComponent, ApexNonAxisChartSeries, ApexResponsive, ApexChart } from 'ng-apexcharts';

// Export chart options
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})

export class TotalComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  // is chartDataLoaded ?
  chartDataLoaded = false;

  // Array that contains all countries from the API
  countriesArray = [] as any;
  // Array that contains the country the user selected
  country = [] as any;

  // Error variable will be called if request error
  error!: string;


  // Variables for the data
  countryTotalCases!: number;
  countryTotalRecovered!: number;
  countryTotalDeaths!: number;
  countryTotalActive!: number;
  countryFlag!: string;
  countryTodayCases!: number;
  countryTodayDeaths!: number;
  countryTodayRecovered!: number;


  // Get the service and set it to aboutService
  constructor(private apiDataService: ApiDataService) {}


  ngOnInit(): void {
    // Get the data from service, and subscribe
    this.apiDataService.getCountries().subscribe((data) => {
      // Place the subscribed data into countriesArray
      this.countriesArray = data;
      console.log('!!!!!!!!!Country array log från total.component.ts!!!!!!!!!!!', this.countriesArray);
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

  // Function to get RealtimeData from service and pass the country the user selected
  // tslint:disable-next-line: typedef
  getData(){
    this.apiDataService.getRealtimeData(this.country).subscribe((data) => {

      // Get the specified data from the API
      this.countryTotalCases = data.cases;
      this.countryTotalRecovered = data.recovered;
      this.countryTotalDeaths = data.deaths;
      this.countryTotalActive = data.active;
      this.countryFlag = data.countryInfo.flag;
      this.countryTodayCases = data.todayCases;
      this.countryTodayDeaths = data.todayDeaths;
      this.countryTodayRecovered = data.todayRecovered;

      // Chart starts
      this.chartOptions = {
        //
        series: [ this.countryTotalCases, this.countryTotalRecovered, this.countryTotalDeaths],
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: ['Confirmed', 'Recovered', 'Deaths'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      };
      // Data is loaded show chart
      this.chartDataLoaded = true;

    },
      /* Catch error so we can print it in the view if needed*/
      (error) => {
      this.error = error;
    });
  }

  // Function to trigger disabled property
  // tslint:disable-next-line: typedef
  disable(){}

}
