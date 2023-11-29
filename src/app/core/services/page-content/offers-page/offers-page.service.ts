import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersPageService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("offers_page");
  }
  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    formData.append('content_ar' , data.content_ar)
    formData.append('content_en' , data.content_en)
    formData.append('second_title_ar', data.second_title_ar)
    formData.append('second_title_en', data.second_title_en)
    formData.append('google_play_link', data.google_play_link)
    formData.append('app_store_link', data.app_store_link)
    if(data.img_path)formData.append('img_path' , data.img_path)
    if(data.logo_path)formData.append('logo_path' , data.logo_path)
    return this.HttpClient.post<any>("offers_page/update" , formData);
  }
}
