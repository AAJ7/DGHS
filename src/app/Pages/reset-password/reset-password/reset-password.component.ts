import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent
{
  constructor(private AuthService:AuthService ,  private toast:NgToastService , private Router:Router)
  {}
  ResetPasswordForm:FormGroup = new FormGroup
  (
    {
      resetpassword : new FormControl (null , [Validators.required]),
      reresetpassword : new FormControl (null , [Validators.required]),
    }
  );





  ResetPassword(ResetPasswordForm:FormGroup)
  {
    if(ResetPasswordForm.valid && (ResetPasswordForm.value.resetpassword === ResetPasswordForm.value.resetpassword))
    {
      const formData = new FormData();
      formData.append("email" , JSON.parse(localStorage.getItem("email")!)),
      formData.append("password" , ResetPasswordForm.value.reresetpassword),
      formData.append("token" , JSON.parse(localStorage.getItem("token")!))

      this.AuthService.passwordResetToken(formData).subscribe
      (
        {
          next:(response)=>
          {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            this.Router.navigateByUrl('/password-updated-successfully');
          }
        }
      )

    }
  }
}
