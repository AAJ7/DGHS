import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompainesService {

  constructor(private HttpClient:HttpClient) { }

  companies(id:any):Observable<any> {
    return this.HttpClient.get<any>("company?country_id=" + id);
  }
  get():Observable<any> {
    return this.HttpClient.get<any>("company");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    formData.append('email', data.email)
    formData.append('phone' , data.phone)
    formData.append('password' , data.password)
    formData.append('country_id' , data.country_id)
    formData.append('logo_path' , data.logo_path)
    formData.append('orders_per_hour' , data.orders_per_hour)
    return this.HttpClient.post<any>("company" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData;
      formData.append("name" , data.name)
      formData.append('name_ar', data.name_ar)
      formData.append('name_en', data.name_en)
      formData.append("email" , data.email)
      formData.append("id" , data.id)
      formData.append("phone" ,data.phone)
      if(data.password)formData.append('password' , data.password)
      formData.append("country_id" ,data.country_id)
      if(data.logo_path)formData.append('logo_path' , data.logo_path)
      formData.append('orders_per_hour' , data.orders_per_hour)
    return this.HttpClient.post<any>("company/update" , formData);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("company/" + id);
  }
}
