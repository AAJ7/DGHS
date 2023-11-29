import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderRatesService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("base_orders_rate");
  }
  create(data:any):Observable<any> {
    const formData = new FormData;
    formData.append("name_ar" , data.name_ar)
    formData.append("name_en" , data.name_en)
    return this.HttpClient.post<any>("base_orders_rate" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData;
    formData.append("name_ar" , data.name_ar)
    formData.append("name_en" , data.name_en)
    formData.append("id" , data.id)
    return this.HttpClient.post<any>("base_orders_rate/update" , formData);
  } 
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("base_orders_rate/" + id);
  }
}
