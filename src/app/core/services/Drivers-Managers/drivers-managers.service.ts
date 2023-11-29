import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversManagersService {

  constructor(private HttpClient:HttpClient) { }

  show(id:number):Observable<any> {
    return this.HttpClient.get<any>("drivers_manager?country_id=" + id);
  }
  get():Observable<any> {
    return this.HttpClient.get<any>("drivers_manager");
  }

  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('phone', data.phone)
    formData.append('country_id', data.country_id)
    return this.HttpClient.post<any>("drivers_manager" , formData);
  }
  update(data:any) {
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('id' , data.id)
    formData.append('country_id', data.country_id)
    return this.HttpClient.post<any>("drivers_manager/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("drivers_manager/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("drivers_manager/" + id + "/activate/" + active);
  }
}
