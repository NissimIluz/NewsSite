import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { ErrorObj } from '../models/error';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBase = 'api/';
  private get httpOptions() {
    return {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    }
  }
  constructor(private _http: HttpClient) {}

  get(action: string) {
    return this._http.get<ApiResponse>(this.apiBase + action, this.httpOptions).pipe(
      mergeMap((result: ApiResponse) => {
        if (result.status === true) {
          return of(result.data);
        }
        else {
          this.handleError(result.error);
          return throwError(result);
        }
    }));
  }

  post(action: string, data: any) {
    return this._http.post<ApiResponse>(this.apiBase + action, data, this.httpOptions).pipe(
      mergeMap((result: ApiResponse) => {
        if (result.status === true) {
          return of(result.data);
        }
        else {
            this.handleError(result.error);
            return throwError(result);
          }
      }));
    }
  

  put(action: string, data: any) {
    return this._http.put<ApiResponse>(this.apiBase + action, data, this.httpOptions).pipe(
      mergeMap((result: ApiResponse) => {
        if (result.status === true) {
          return of(result.data);
        }
        else {
            this.handleError(result.error);
            return throwError(result);
          }
      }));
    }
  

  handleError(error: ErrorObj): any {
    alert('התרחשה שגיאה בלתי צפויה');
    console.log(error);
    return null;
  }
}