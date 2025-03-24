import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Shipper } from '../../model/shipper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {
  private apiurl = environment.urlapi;
  
  private shipperssignal = signal<Shipper[]>([])

  constructor( private http:HttpClient) {}
  
  getshippers(){
    this.http.get<Shipper[]>(this.apiurl+"sp_get_Shippers").subscribe(
      res=>this.shipperssignal.set(res))
  }

  get shippers(){
    return this.shipperssignal
  }  
} 
