import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyIncomeReportsService {

  private _baseUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) { }

  getMonthlyIncomeByCategory(): Observable<any[]> {
    const url = `${this._baseUrl}/monthly-income-by-category`;
    return this._http.get<any[]>(url);
  }

  getMonthlyIncomeByPaymentMethod(): Observable<any[]> {
    const url = `${this._baseUrl}/monthly-income-by-payment-method`;
    return this._http.get<any[]>(url);
  }

  getMonthlyIncomeBySourceName(): Observable<any[]> {
    const url = `${this._baseUrl}/monthly-income-by-source-name`;
    return this._http.get<any[]>(url);
  }
}
