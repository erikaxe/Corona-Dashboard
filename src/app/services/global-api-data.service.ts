import { Injectable } from '@angular/core';

import { HttpClient, /* HttpErrorResponse */ } from '@angular/common/http';
import { Observable } from 'rxjs';
/* import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators'; */

@Injectable({
  providedIn: 'root'
})
export class GlobalApiDataService {

  // Create http and set it to perform HTTP requests
  constructor(private http: HttpClient) { }

  // Function to get yesterdays global data from API
  getGlobalData(): Observable<any> {
    const url = 'https://corona.lmao.ninja/v2/all?yesterday';
    return this.http.get<any>(url);
  }

}
