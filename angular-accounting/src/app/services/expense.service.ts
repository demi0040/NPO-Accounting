import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private _http: HttpClient) { }

  addExpense(expense: any): Observable<any> {
    return this._http.post('http://localhost:3000/api/expenses', expense, { responseType: 'text' })
      .pipe(
        catchError(error => {
          // Check if the error is due to parsing non-JSON response for POST
          if (error instanceof HttpErrorResponse && error.status === 200 && error.statusText === 'OK') {
            return of({}); // Return an empty object or any other suitable response
          } else {
            return throwError(error); // Rethrow other errors
          }
        })
      );
  }

  updateExpense(id: number, expense: any): Observable<any> {
    return this._http.put(`http://localhost:3000/api/expenses/${id}`, expense, { responseType: 'text' })
      .pipe(
        catchError(error => {
          // Check if the error is due to parsing non-JSON response for PUT
          if (error instanceof HttpErrorResponse && error.status === 200 && error.statusText === 'OK') {
            return of({}); // Return an empty object or any other suitable response
          } else {
            return throwError(error); // Rethrow other errors
          }
        })
      );
  }

  getExpenses(): Observable<any> {
    return this._http.get('http://localhost:3000/api/expenses')
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError('Error retrieving expenses');
        })
      );
  }

  deleteExpense(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/api/expenses/${id}`, { responseType: 'text' })
      .pipe(
        catchError(error => {
          // Check if the error is due to parsing non-JSON response for DELETE
          if (error instanceof HttpErrorResponse && error.status === 200 && error.statusText === 'OK') {
            return of({}); // Return an empty object or any other suitable response
          } else {
            return throwError(error); // Rethrow other errors
          }
        })
      );
  }
}
