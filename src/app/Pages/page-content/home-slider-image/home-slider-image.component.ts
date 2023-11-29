import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeSliderImageService } from 'src/app/core/services/page-content/home_slider_image/home-slider-image.service';


@Component({
  selector: 'app-home-slider-image',
  templateUrl: './home-slider-image.component.html',
  styleUrls: ['./home-slider-image.component.scss']
})
export class HomeSliderImageComponent implements OnInit {

  rows:any[] = [];
  loader_update:boolean = false;
  Update_Form:FormGroup = new FormGroup ({
    id             : new FormControl(null , [Validators.required]),
    active         : new FormControl(null , [Validators.required]),
    img_path       : new FormControl(null),

  }
);
  constructor(private HomeSliderImageService: HomeSliderImageService, private toast: NgToastService) {

  }
  ngOnInit(): void {
    this.show();
  }
  show() {
    this.rows= [];
    this.HomeSliderImageService.show().subscribe ({
      next:(response)=> {
        this.rows = [];
        this.rows = response?.data;
      }
    });
  }
  onFileSelected(event:any , id:any , active:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      // this.Base64 = reader.result;
    };
      this.Update_Form.patchValue ({
        img_path : file,
        id       : id,
        active   : active
      });

  }
  Update(Update_Form:FormGroup) {
    this.loader_update = true;
    if(Update_Form.valid) {
      this.HomeSliderImageService.update(Update_Form.value).subscribe ({
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
