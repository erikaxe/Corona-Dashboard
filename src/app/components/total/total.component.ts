
import { Component, OnInit } from '@angular/core';

// Service imports
import { ApiDataService } from './../../services/api-data.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {

  // Array that contains all countries from the API
  countriesArray = [] as any;
  // Array that contains the country the user selected
  country = [] as any;


  // Variables for the data
  confirmed!: number;
  recovered!: number;
  deaths!: number;

  // Get the service and set it to aboutService
  constructor(private apiDataService: ApiDataService) {}

  ngOnInit(): void {
    // Get the data from service, and subscribe
    this.apiDataService.getCountries().subscribe((data) => {
      // Place the subscribed data into countriesArray
      this.countriesArray = data;
      console.log('!!!!!!!!!Country array from API!!!!!!!!!!!', this.countriesArray);
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
      this.confirmed = data.cases;
      this.recovered = data.recovered;
      this.deaths = data.deaths;
      console.log(data);
    });
  }

}
