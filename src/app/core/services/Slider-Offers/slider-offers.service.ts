import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderOffersService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("slider_offer");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('link', data.link)
    formData.append('from', data.from)
    formData.append('to' , data.to)
    formData.append('img_path' , data.img_path)
    return this.HttpClient.post<any>("slider_offer" , formData);
  }
  update(data:any) {
    const formData = new FormData();
    formData.append('from', data.from)
    formData.append('to' , data.to)
    formData.append('link', data.link)
    if(data.img_path)formData.append('img_path' , data.img_path)
    formData.append('id' , data.id)
    return this.HttpClient.post<any>("slider_offer/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("slider_offer/" + id);
  }

  activate(id:any , active:any) {
    return this.HttpClient.get<any>("slider_offer/" + id + "/activate/" + active);
  }
}
