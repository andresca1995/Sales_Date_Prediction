import { Injectable, signal } from '@angular/core';
import { Employee } from '../../model/employee';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiurl = environment.urlapi;

  private empleyeessignal=signal<Employee[]>([])

  constructor(private http:HttpClient) { }

  getemployee(){
    this.http.get<Employee[]>(this.apiurl+"sp_get_employees")
    .subscribe(res=>this.empleyeessignal.set(res))
  }

  get employee(){
    return this.empleyeessignal
  }

}
 