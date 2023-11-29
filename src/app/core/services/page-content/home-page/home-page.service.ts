import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("home_page");
  }
  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    formData.append('content_ar' , data.content_ar)
    formData.append('content_en' , data.content_en)
    formData.append('button_text_ar' , data.button_text_ar)
    formData.append('button_text_en' , data.button_text_en)
    return this.HttpClient.post<any>("home_page/update" , formData);
  }
}
