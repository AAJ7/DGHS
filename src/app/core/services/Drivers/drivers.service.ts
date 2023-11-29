import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private HttpClient:HttpClient) { }

  drivers():Observable<any> {
    return this.HttpClient.get<any>("driver");
  }
  driversWithManagerID(id:any):Observable<any> {
    return this.HttpClient.get<any>("driver?manager_id=" + id);
  }
  create(data:any):Observable<any> {
    const formData = new FormData;
      formData.append("name" , data.name)
      formData.append("email" , data.email)
      formData.append("password" , data.password)
      formData.append("phone" , data.phone)
      formData.append("manager_id" , data.manager_id)
    return this.HttpClient.post<any>("driver" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData;
    formData.append("name" , data.name)
    formData.append("email" , data.email)
    if (data.password) {
      formData.append("password" , data.password)
    }
    formData.append("phone" , data.phone)
    formData.append("manager_id" , data.manager_id)
    formData.append("id" , data.id)
    return this.HttpClient.post<any>("driver/update" , data);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("driver/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("driver/" + id + "/activate/" + active);
  }
}
