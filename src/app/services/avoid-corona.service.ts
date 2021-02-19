// Imports
import { Injectable } from '@angular/core';
import { HttpClient, /* HttpErrorResponse */ } from '@angular/common/http';
import { Observable } from 'rxjs';
/* import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators'; */

@Injectable({
  providedIn: 'root'
})
export class AvoidCoronaService {
  // Create url and give it access to userjson.json
  private url = '/assets/corona-info.json';

  // Create http and set it to perform HTTP requests
  constructor(private http: HttpClient) {}

  // Get corona info from json
  getCoronaInfo(): Observable<any>{
    return this.http.get<any>(this.url);
  }
}
