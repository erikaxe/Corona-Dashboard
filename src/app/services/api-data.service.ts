// Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  // Create http and set it to perform HTTP requests
  constructor(private http: HttpClient) {}

  // Function to get countries from API
  getCountries(): Observable<any> {
    const url = 'https://corona.lmao.ninja/v2/countries';
    // Return countries, if error, errorHandler will trigger
    return this.http.get<any>(url).pipe(catchError(this.errorHandler));
  }

  // Function to get Covid-19 statistic + dynamic country selection from the user
  getRealtimeData(country: string): Observable<any> {
    const url = `https://corona.lmao.ninja/v2/countries/${country}`;
    // Return data for chosen country, if error, errorHandler will trigger
    return this.http.get<any>(url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    // Return error message from Angular OR return 'Server error'
    return observableThrowError(error.message || 'Server error');
  }

}
