import { Injectable } from '@angular/core';
import { HttpClient, /* HttpErrorResponse */ } from '@angular/common/http';
import { Observable } from 'rxjs';
/* import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators'; */

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  /* private apiUrl = 'https://api.covid19api.com';
  private apiCountries = 'https://api.covid19api.com/countries'; */

  // Create http and set it to perform HTTP requests
  constructor(private http: HttpClient) {}

  // Function to get countries
  getCountries(): Observable<any> {
    const url = 'https://api.covid19api.com/countries';
    return this.http.get<any>(url);
  }

  // Function to get Covid-19 statistic + dynamic country selection
  getRealtimeData(country: string): Observable<any> {
    const url = 'https://api.covid19api.com/total/dayone/country/' + country;
    return this.http.get<any>(url);
  }

}
