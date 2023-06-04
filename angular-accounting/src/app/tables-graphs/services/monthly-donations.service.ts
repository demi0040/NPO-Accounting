import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonthlyDonationsService {

  constructor(private _http: HttpClient) { }

  getMonthlyDonations(): Observable<any> {
    return this._http.get('http://localhost:3000/api/monthly-donations')
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError('Error retrieving donations');
        })
      );
  }
}
