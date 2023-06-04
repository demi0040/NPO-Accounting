import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonorDifferenceService {

  constructor(private _http: HttpClient) { }

  getDonors(): Observable<any> {
    return this._http.get('http://localhost:3000/api/donors-with-income').pipe(
      catchError((error) => {
        console.error(error);
        return throwError('Error retrieving donors');
      })
    );
  }
}
