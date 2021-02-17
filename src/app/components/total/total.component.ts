
import { Component, OnInit } from '@angular/core';

// Service imports
import { ApiDataService } from './../../services/api-data.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {

  countriesArray = [] as any;
  country = [] as any;

  // Get the service and set it to aboutService
  constructor(private apiDataService: ApiDataService) {}

  ngOnInit(): void {
    // Get the data from service, and subscribe
    this.apiDataService.getCountries().subscribe((data) => {
      console.log(data);
      // Place the subscribed data into countriesArray
      this.countriesArray = data;
    });
  }

  // Function that holds the country the user selected
  getCountry(country: any){
    this.country = country;
  }

  // Function to get RealtimeData from service and pass the country the user selected
  getData(){
    this.apiDataService.getRealtimeData(this.country).subscribe((data) => {
      console.log(data);
    });
  }

}
