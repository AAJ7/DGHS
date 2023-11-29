import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarFooterService } from 'src/app/core/services/page-content/navbar-footer/navbar-footer.service';


@Component({
  selector: 'app-navbar-and-footer-content',
  templateUrl: './navbar-and-footer-content.component.html',
  styleUrls: ['./navbar-and-footer-content.component.scss']
})
export class NavbarAndFooterContentComponent implements OnInit {
  loader_update:boolean = false;
  Update_Form:FormGroup = new FormGroup ({
    whatsapp_number   : new FormControl(null , [Validators.required]),
    phone_number      : new FormControl(null , [Validators.required]),
    facebook_link     : new FormControl(null , [Validators.required]),
    instagram_link    : new FormControl(null , [Validators.required]),
    twitter_link      : new FormControl(null , [Validators.required]),
    footer_title_ar   : new FormControl(null , [Validators.required]),
    footer_title_en   : new FormControl(null , [Validators.required]),
    footer_content_ar : new FormControl(null , [Validators.required]),
    footer_content_en : new FormControl(null , [Validators.required]),
  }
);
  constructor(private  NavbarFooterService: NavbarFooterService, private toast: NgToastService) {

  }
  ngOnInit(): void {
    this.show();
  }
  show() {
    this.NavbarFooterService.show().subscribe ({
      next:(response)=> {
        this.Update_Form.patchValue ({
          whatsapp_number : response?.data?.whatsapp_number,
          phone_number : response?.data?.phone_number,
          facebook_link : response?.data?.facebook_link,
          instagram_link : response?.data?.instagram_link,
          twitter_link : response?.data?.twitter_link,
          footer_title_ar : response?.data?.footer_title_ar,
          footer_title_en : response?.data?.footer_title_en,
          footer_content_ar : response?.data?.footer_content_ar,
          footer_content_en : response?.data?.footer_content_en,
        });
      }
    });
  }
  Update(Update_Form:FormGroup) {
    this.loader_update = true;
    if(Update_Form.valid) {
      this.NavbarFooterService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_update = false;
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:"All Changes Have Been Completed",duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
        }
      });
    }
  }
}
