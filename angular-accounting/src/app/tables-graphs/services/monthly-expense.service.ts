import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonthlyExpenseService {

  constructor(private _http: HttpClient) { }

  getMonthlyExpenses(): Observable<any> {
    return this._http.get('http://localhost:3000/api/monthly-expense')
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError('Error retrieving expenses');
        })
      );
  }
}
