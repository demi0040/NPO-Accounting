import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonorAreaGroupService {

  private _url: string = "http://localhost:3000/api/donors-with-income-details";

  constructor(private _http: HttpClient) {}

  getDonorsAreaGroup() {
    return this._http.get<any>(this._url);
  }
}
