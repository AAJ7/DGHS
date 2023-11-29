import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TermsAndConditionsService } from 'src/app/core/services/page-content/term-and-conditions/terms-and-conditions.service';


@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  loader_update:boolean = false;
  Update_Form:FormGroup = new FormGroup ({
    title_ar       : new FormControl(null , [Validators.required]),
    title_en       : new FormControl(null , [Validators.required]),
    description_ar : new FormControl(null , [Validators.required]),
    description_en : new FormControl(null , [Validators.required]),
  }
);
  constructor(private  TermsAndConditionsService: TermsAndConditionsService, private toast: NgToastService) {

  }
  ngOnInit(): void {
    this.show();
  }
  show() {
    this.TermsAndConditionsService.show().subscribe ({
      next:(response)=> {
        this.Update_Form.patchValue ({
          title_ar       : response?.data?.title_ar,
          title_en       : response?.data?.title_en,
          description_ar : response?.data?.description_ar,
          description_en : response?.data?.description_en,
        });
      }
    });
  }
  Update(Update_Form:FormGroup) {
    this.loader_update = true;
    if(Update_Form.valid) {
      this.TermsAndConditionsService.update(Update_Form.value).subscribe ({
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
