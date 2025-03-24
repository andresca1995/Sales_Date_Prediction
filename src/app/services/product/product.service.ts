import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../model/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private apiurl = environment.urlapi;

 private productssignal = signal<Product[]>([])

  constructor( private http:HttpClient) { }

  getproducts(){
    this.http.get<Product[]>(this.apiurl+'sp_get_Products').subscribe(
      res=>this.productssignal.set(res)
    )
  }

  get productos(){
    return this.productssignal
  }
}
