import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("payment_method");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    formData.append('img_path' , data.img_path)
    return this.HttpClient.post<any>("payment_method" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    if(data.img_path)formData.append('img_path' , data.img_path)
    formData.append('active' , data.active)
    formData.append('id' , data.id)
    return this.HttpClient.post<any>("payment_method/update" , formData);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("payment_method/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("payment_method/" + id + "/activate/" + active);
  }

}
