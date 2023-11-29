import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private HttpClient:HttpClient) { }

  user():Observable<any> {
    return this.HttpClient.get<any>("admin");
  }
  create(data:any):Observable<any> {
    const formData = new FormData;
      formData.append("name" , data.name)
      formData.append("email" , data.email)
      formData.append("password" , data.password)
      formData.append("phone" , data.phone)
    return this.HttpClient.post<any>("admin" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData;
      formData.append("name" , data.name)
      formData.append("email" , data.email)
      if (data.password) {
        formData.append("password" , data.password)
      }
      formData.append("phone" , data.phone)
      formData.append("id" , data.id)
    return this.HttpClient.post<any>("admin/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("admin/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("admin/" + id + "/activate/" + active);
  }
}
