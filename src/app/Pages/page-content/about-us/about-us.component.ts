import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AboutUsPageService } from 'src/app/core/services/page-content/about-us-page/about-us-page.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  loader_update:boolean = false;
  Update_Form:FormGroup = new FormGroup ({
    title_ar       : new FormControl(null , [Validators.required]),
    title_en       : new FormControl(null , [Validators.required]),
    content_ar : new FormControl(null , [Validators.required]),
    content_en : new FormControl(null , [Validators.required]),
  }
);
  constructor(private  AboutUsPageService: AboutUsPageService, private toast: NgToastService) {

  }

  ngOnInit(): void {
    this.show();
  }
  show() {
    this.AboutUsPageService.show().subscribe ({
      next:(response)=> {
        this.Update_Form.patchValue ({
          title_ar : response?.data?.title_ar,
          title_en : response?.data?.title_en,
          content_ar : response?.data?.content_ar,
          content_en : response?.data?.content_en,
        });
      }
    });
  }
  Update(Update_Form:FormGroup) {
    this.loader_update = true;
    if(Update_Form.valid) {
      this.AboutUsPageService.update(Update_Form.value).subscribe ({
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
