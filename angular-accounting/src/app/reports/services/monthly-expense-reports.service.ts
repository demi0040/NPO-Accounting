import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyExpenseReportsService {

  private _baseUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) { }

  getMonthlyExpenseByCategory(): Observable<any[]> {
    const url = `${this._baseUrl}/monthly-total-expenses-by-category`;
    return this._http.get<any[]>(url);
  }

  getMonthlyExpenseByPaymentMethod(): Observable<any[]> {
    const url = `${this._baseUrl}/monthly-total-expenses-by-payment-method`;
    return this._http.get<any[]>(url);
  }

  getMonthlyExpenseByExpenseName(): Observable<any[]> {
    const url = `${this._baseUrl}/monthly-total-expenses-by-expense-name`;
    return this._http.get<any[]>(url);
  }

  getMonthlyExpenseByPayeeInformation(): Observable<any[]> {
    const url = `${this._baseUrl}/monthly-total-expenses-by-payee`;
    return this._http.get<any[]>(url);
  }


}
