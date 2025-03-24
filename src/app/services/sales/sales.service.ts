import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SalesDate } from '../../model/sales-date';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiurl = environment.urlapi;

  private salessignal=signal<SalesDate[]>([])

  constructor(private http:HttpClient) { }

  getsalesdate(){
    this.http.get<SalesDate[]>(this.apiurl+"sp_get_sales_date_predicion")
    .subscribe(res=>this.salessignal.set(res))
  }

  get salesdate(){
    return this.salessignal
  }
}
