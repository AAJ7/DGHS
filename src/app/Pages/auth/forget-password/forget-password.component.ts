import { FormGroup , FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgToastService } from 'ng-angular-popup';




@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent
{
  constructor(private Router:Router , private AuthService:AuthService , private toast:NgToastService){}

  ForgetPasswordForm:FormGroup = new FormGroup
  (
    {
      email : new FormControl( null , [Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    }
  );

  GoToLogin()
  {
    this.Router.navigate(["/auth/login"]);
  }

  forgetPassword(ForgetPasswordForm:FormGroup)
  {
    if(ForgetPasswordForm.valid)
    {
      this.AuthService.passwordResetToken(ForgetPasswordForm.value.email).subscribe
      (
        {
          next:(response)=>
          {
            localStorage.setItem("email", JSON.stringify(ForgetPasswordForm.value.email));
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            this.Router.navigate(["/verification-code"]);
          }
        }
      );
    }
  }
}
