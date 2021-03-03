// Imports
import { Component, OnInit, ViewChild, ApplicationRef } from '@angular/core';

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


// Import chart model
/* import { Chart, Serie, Category } from '../../shared/chart'; */

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
  // Chart should not be static
  @ViewChild('chart', {static: false}) chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  // is chartDataLoaded ?
  chartDataLoaded = false;

  // Array that contains all countries from the API
  countriesArray = [] as any;

  // Array to contain all information from specified country, IS EMPTY ATM
  /* countryInfo = [] as any; */

  // Array to contain all picked countries, IS EMPTY ATM
  /* chartCountries = [] as any; */

  // Array that contains the country the user selected
  country = [] as any;

  // Variables containing data to the chart
  cases = [] as any;
  recovered = [] as any;
  deaths = [] as any;
  categories = [] as any;

  constructor(private apiDataService: ApiDataService, private cdr: ApplicationRef) {
    this.chartOptions = {
      // Chart bars for each category, place variables as data
      series: [
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
      xaxis: {
        // Place selected country in chart
        // tslint:disable-next-line: max-line-length
        categories: this.categories

      },
      yaxis: {
        title: {
          text: 'Cases'
        }
      },
    };
  }

  updateChartOptions(): void {
    /* !!!!!!!!! DATAN SKICKAS ALDRIG HIT FRÅN getData(), Tror det är för updateChartOptions inte "väntar" in getData() !!!!!!!!! */
    /* !!!!!!!!! Loopen körs nog aldrig för country är empty !!!!!!!!! */


    // Variables for the data

    /* console.log(this.chartCountries, 'chartCountries log från updateChartOptions');
    console.log(this.countryInfo, 'countryInfo log från updateChartOptions'); */


    /* for (const stats of this.countryInfo){
      countryTotalCases.push(stats.cases);
      countryTotalDeaths.push(stats.deaths);
      countryTotalRecovered.push(stats.recovered);
      console.log(countryTotalCases, 'log från loop');
    }

    console.log(this.countryInfo, 'countryInfo log från updateChartOptions');
    console.log(this.chartCountries, 'chartCountries log från updateChartOptions'); */

    this.chartOptions = {
      // Chart bars for each category, place variables as data
      series: [
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
      xaxis: {
        // Place selected country in chart
        // tslint:disable-next-line: max-line-length
        categories: this.categories

      },
      yaxis: {
        title: {
          text: 'Cases'
        }
      },
    };
    console.log(this.chartOptions.xaxis?.categories, 'Log från categories');
    // Data is loaded show chart
    this.chartDataLoaded = true;
  }

  ngOnInit(): void {
    // Get the data from service, and subscribe
    this.apiDataService.getCountries().subscribe((data) => {
      // Place the subscribed data into countriesArray
      this.countriesArray = data;
      this.updateChartOptions();
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
    this.apiDataService.getRealtimeData(this.country).subscribe((data) => {
      // Get the specified data from the API

      // Call setData and put in the data
      this.setData(data);

      console.log(data);
    });
  }

  // Place data in variables
  setData(country: any): void {
    const series = this.chartOptions.series;
    // If series have 3 objects push data to variables
    if (series?.length === 3){
      this.cases.push(country.cases);
      this.recovered.push(country.recovered);
      this.deaths.push(country.deaths);
      this.categories.push(country.country);
    }
    // Force render
    this.cdr.tick();
  }

  // Function to reset the chart
  resetChart(): void {
    this.cases = [];
    this.recovered = [];
    this.deaths = [];
    this.categories = [];

    console.log('reset Chart button pressed');
  }

  // Function to trigger disabled property
  // tslint:disable-next-line: typedef
  disable(){}
}
