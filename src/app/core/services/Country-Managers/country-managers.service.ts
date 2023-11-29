import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CountryManagersService {

  constructor(private HttpClient:HttpClient) { }

  show(id:number):Observable<any> {
    return this.HttpClient.get<any>("country_manager?country_id=" + id);
  }
  create(data:any):Observable<any> {
      const formData = new FormData;
      formData.append("name" , data.name)
      formData.append("email" , data.email)
      formData.append("password" , data.password)
      formData.append("phone" ,data.phone)
      formData.append("country_id" , data.country_id)
    return this.HttpClient.post<any>("country_manager" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData;
      formData.append("name" , data.name)
      formData.append("email" , data.email)
      formData.append("id" , data.id)
      formData.append("phone" ,data.phone)
      formData.append("country_id" ,data.country_id)
    return this.HttpClient.post<any>("country_manager/update" , data);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("country_manager/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("country_manager/" + id + "/activate/" + active);
  }
}
