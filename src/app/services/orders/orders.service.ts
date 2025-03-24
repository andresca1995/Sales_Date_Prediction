import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { confirm, Orders } from '../../model/orders';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiurl = environment.urlapi;

  private orderssignal=signal<Orders[]>([])
  private confirmsignal=signal<confirm[]>([])

  constructor(private http:HttpClient) { }

  getortders(idcliente:number){
    let data ={
      "CustomerID": idcliente
    }
    this.http.post<Orders[]>(this.apiurl+"sp_get_Orders_for_client",data)
    .subscribe(res=>this.orderssignal.set(res))
  }

  setnueworder(data:any):Observable<any>{
    return this.http.post<confirm[]>(this.apiurl+"sp_set_new_orders",data)
  }

  get orders(){
    return this.orderssignal
  }
  get confirm(){
    return this.confirmsignal
  }
}
