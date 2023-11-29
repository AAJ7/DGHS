import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeOffersService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("promo_code_offer");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('img_path', data.img_path)
    formData.append('promo_code_id', data.promo_code_id)
    return this.HttpClient.post<any>("promo_code_offer" , formData);
  }
  update(data:any) {
    const formData = new FormData();
    formData.append('img_path', data.img_path)
    formData.append('promo_code_id', data.promo_code_id)
    formData.append('id' , data.id)
    return this.HttpClient.post<any>("promo_code_offer/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("promo_code_offer/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("promo_code_offer/" + id + "/activate/" + active);
  }
}
