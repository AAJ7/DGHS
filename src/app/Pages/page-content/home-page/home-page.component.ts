import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomePageService } from 'src/app/core/services/page-content/home-page/home-page.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loader_update:boolean = false;
  Update_Form:FormGroup = new FormGroup ({
    title_ar       : new FormControl(null , [Validators.required]),
    title_en       : new FormControl(null , [Validators.required]),
    content_ar     : new FormControl(null , [Validators.required]),
    content_en     : new FormControl(null , [Validators.required]),
    button_text_ar : new FormControl(null , [Validators.required]),
    button_text_en : new FormControl(null , [Validators.required]),
  }
);
  constructor(private  HomePageService: HomePageService, private toast: NgToastService) {

  }
  ngOnInit(): void {
    this.show();
  }
  show() {
    this.HomePageService.show().subscribe ({
      next:(response)=> {
        this.Update_Form.patchValue ({
          title_ar       : response?.data?.title_ar,
          title_en       : response?.data?.title_en,
          content_ar     : response?.data?.content_ar,
          content_en     : response?.data?.content_en,
          button_text_ar : response?.data?.button_text_ar,
          button_text_en : response?.data?.button_text_en
        });
      }
    });
  }
  Update(Update_Form:FormGroup) {
    this.loader_update = true;
    if(Update_Form.valid) {
      this.HomePageService.update(Update_Form.value).subscribe ({
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
