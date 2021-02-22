// Imports
import { Component, OnInit } from '@angular/core';

// Service imports
import { GlobalApiDataService } from './../../services/global-api-data.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  // Array that contains data from API
  globalArray = [] as any;

  continentArray = [] as any;

  // Error variable will be called if request error
  error!: string;

  // Get the service and set it to globalApiDataService
  constructor(private globalApiDataService: GlobalApiDataService) { }

  ngOnInit(): void {

    // Get the data from service, and subscribe
    this.globalApiDataService.getGlobalData().subscribe((data) => {
      // Place the subscribed data into globalArray
      this.globalArray = data;
      console.log(data);
    },
    /* Catch error so we can print it in the view if needed*/
    (error) => {
    this.error = error;
    });

    this.globalApiDataService.getContinentData().subscribe((data) => {
      // Place the subscribed data into continentArray
      this.continentArray = data;
      console.log(data);
    },
    (error) => {
      this.error = error;
    });
  }

}
