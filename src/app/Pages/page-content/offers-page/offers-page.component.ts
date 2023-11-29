import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OffersPageService } from 'src/app/core/services/page-content/offers-page/offers-page.service';


@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.scss']
})
export class OffersPageComponent implements OnInit {

  loader_update:boolean = false;
  img_path:string = "";
  logo_path:string = "";

  Update_Form:FormGroup = new FormGroup ({
    title_ar         : new FormControl(null , [Validators.required]),
    title_en         : new FormControl(null , [Validators.required]),
    content_ar       : new FormControl(null , [Validators.required]),
    content_en       : new FormControl(null , [Validators.required]),
    second_title_ar  : new FormControl(null , [Validators.required]),
    second_title_en  : new FormControl(null , [Validators.required]),
    app_store_link   : new FormControl(null , [Validators.required]),
    google_play_link : new FormControl(null , [Validators.required]),
    img_path         : new FormControl(null),
    logo_path        : new FormControl(null),
  }
);
  constructor(private OffersPageService: OffersPageService, private toast: NgToastService) {

  }
  ngOnInit(): void {
    this.show();
  }
  show() {
    this.OffersPageService.show().subscribe ({
      next:(response)=> {
        this.Update_Form.patchValue ({
          title_ar : response?.data?.title_ar,
          title_en : response?.data?.title_en,
          second_title_ar : response?.data?.second_title_ar,
          second_title_en : response?.data?.second_title_en,
          content_ar : response?.data?.content_ar,
          content_en : response?.data?.content_en,
          app_store_link : response?.data?.app_store_link,
          google_play_link : response?.data?.google_play_link
        });
        this.img_path = response?.data?.img_path
        this.logo_path = response?.data?.logo_path
      }
    });
  }
  onFileSelected(event:any , key:string) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      // this.Base64 = reader.result;
    };
    if(key === "update_img_path") {
      this.Update_Form.patchValue ({
        img_path : file
      });
    } else if(key === "update_logo_path") {
      this.Update_Form.patchValue ({
        logo_path : file
      });
    }
  }
  Update(Update_Form:FormGroup) {
    this.loader_update = true;
    if(Update_Form.valid) {
      this.OffersPageService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_update = false;
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"The image must be type of png , jpg , jpeg",duration:5000});
          }
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
