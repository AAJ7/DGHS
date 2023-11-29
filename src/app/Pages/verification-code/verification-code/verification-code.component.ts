import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit
{
  value!:string;
  @ViewChild('ngxotp') ngxOtp!: NgxOtpInputComponent;
  constructor(private Router:Router , private toast:NgToastService){}


  otpInputConfig: NgxOtpInputConfig =
  {
    otpLength: 5,
    autofocus: true,
    pattern : /^\d+$/,
    autoblur : true,
    numericInputMode : true,

    classList:
    {
      container : 'ngx-otp-input-container',
      inputBox: 'ngx-otp-input-box',
      input: 'ngx-otp-input',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };

  handeOtpChange(value: string[]): void {
    console.log(value);
  }
  handleFillEvent(value: string): void {
    console.log(value);
    this.value = value;
  }
  mySuperEvent(): void {
    this.ngxOtp.clear();
  }

  ngOnInit(): void{}

  GoToForgetPassword()
  {
    this.Router.navigate(["/auth/forget-password"]);
  }
  GoToResetPassword()
  {
    if(this.value)
    {
      this.toast.success({detail:"SUCCESS",summary:"OTP Correct",duration:5000});
      this.Router.navigate(["/reset-password"]);
    }
    else
    {
      this.toast.error({detail:"ERROR",summary:"OTP Wrong",duration:5000});
    }
  }
}
