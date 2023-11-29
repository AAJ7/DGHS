import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("promo_code");
  }
  create(data:any):Observable<any> {
    return this.HttpClient.post<any>("promo_code" , data);
  }
  update(data:any) {
    const formData = new FormData();
    formData.append('code', data.code)
    formData.append('value', data.value)
    formData.append('value_type' , data.value_type)
    formData.append('type' , data.type)
    formData.append('from', data.from)
    formData.append('to' , data.to)
    formData.append('id' , data.id)
    return this.HttpClient.post<any>("promo_code/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("promo_code/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("promo_code/" + id + "/activate/" + active);
  }
}
