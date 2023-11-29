import { Router } from '@angular/router';
import { Component , ElementRef, ViewChild } from '@angular/core';
import { FormControl , FormGroup , Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
{
  eye: boolean = false;
  constructor(private AuthService:AuthService , private toast:NgToastService , private Router:Router)
  {

  }
  LoginForm:FormGroup = new FormGroup
  (
    {
      email : new FormControl(null , [Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]) ,
      password : new FormControl(null , [Validators.required])
    }
  )

  @ViewChild("input") Input!:ElementRef;
  seen() {
    if(this.Input.nativeElement.getAttribute("type") === "password") {
      this.Input.nativeElement.setAttribute("type" , "text");
      this.eye=true;
    }
    else{this.Input.nativeElement.setAttribute("type" , "password");this.eye=false;}
  }

  login(LoginForm:FormGroup) {
    const formData = new FormData();
    if(LoginForm.valid) {
      formData.append("email" , LoginForm.value.email);
      formData.append("password" , LoginForm.value.password);
      this.AuthService.login(formData).subscribe ({
          next:(response)=> {
            if(!response?.status && response?.message?.email) {
              this.toast.error({detail:"ERROR",summary:`${response?.message?.email[0]}`,duration:5000});
            } else if(!response?.status && !response?.message?.email) {
              this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
            }
            if(response?.status) {
              localStorage.setItem("token", JSON.stringify(response?.data?.token));
              this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
              this.Router.navigateByUrl('/home', { replaceUrl: true });
            }
          }
        }
      );
    }
  }
}
