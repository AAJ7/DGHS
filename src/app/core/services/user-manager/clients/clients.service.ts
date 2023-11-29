import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  
  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("client");
  }

  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone' , data.phone)
    formData.append('password' , data.password)
    formData.append('age', data.age)
    formData.append('address', data.address)
    formData.append('gender' , data.gender)
    // formData.append('active' , data.active)
    formData.append('avatar' , data.avatar)
    formData.append('country_id' , data.country_id)
    return this.HttpClient.post<any>("client" , formData);
  }

  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('id', data.id)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone' , data.phone)
    formData.append('password' , data.password)
    formData.append('age', data.age)
    formData.append('address', data.address)
    formData.append('gender' , data.gender)
    // formData.append('active' , data.active)
    if(data.avatar)formData.append('avatar' , data.avatar)
    formData.append('country_id' , data.country_id)
    // formData.append('provider_id' , data.provider_id)
    return this.HttpClient.post<any>("client/update" , formData);
  }

  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("client/" + id);
  }
}
