import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private HttpClient:HttpClient) { }

  login(formData:any):Observable<any> {
    return this.HttpClient.post<any>("login" , formData);
  }

  passwordResetToken(email:any):Observable<any> {
    return this.HttpClient.get<any>("send_password_reset_token/" + email);
  }

  ResetPassword(formData:any):Observable<any> {
    return this.HttpClient.post<any>("reset_password" , formData);
  }
}
