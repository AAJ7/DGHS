import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutUsPageService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("about_us_page");
  }
  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    formData.append('content_ar' , data.content_ar)
    formData.append('content_en' , data.content_en)
    return this.HttpClient.post<any>("about_us/update" , formData);
  }
}
