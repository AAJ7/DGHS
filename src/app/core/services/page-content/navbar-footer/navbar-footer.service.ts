import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarFooterService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("nav_bar_footer_content");
  }
  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('whatsapp_number' , data.whatsapp_number)
    formData.append('phone_number', data.phone_number)
    formData.append('facebook_link', data.facebook_link)
    formData.append('instagram_link' , data.instagram_link)
    formData.append('twitter_link' , data.description_en)
    formData.append('footer_title_ar', data.footer_title_ar)
    formData.append('footer_title_en', data.footer_title_en)
    formData.append('footer_content_ar' , data.footer_content_ar)
    formData.append('footer_content_en' , data.footer_content_en)
    return this.HttpClient.post<any>("nav_bar_footer_content/update" , formData);
  }
}
