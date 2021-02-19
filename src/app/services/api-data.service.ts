import { Injectable } from '@angular/core';
import { HttpClient, /* HttpErrorResponse */ } from '@angular/common/http';
import { Observable } from 'rxjs';
/* import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators'; */

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  // Create http and set it to perform HTTP requests
  constructor(private http: HttpClient) {}

  // Function to get countries from API
  getCountries(): Observable<any> {
    const url = 'https://corona.lmao.ninja/v2/countries';
    return this.http.get<any>(url);
  }

  // Function to get Covid-19 statistic + dynamic country selection from the user
  getRealtimeData(country: string): Observable<any> {
    const url = `https://corona.lmao.ninja/v2/countries/${country}?yesterday=true&strict=true&query`;
    return this.http.get<any>(url);
  }

}
