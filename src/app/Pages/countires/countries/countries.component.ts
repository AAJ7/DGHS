import { Component , OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl , FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/core/services/Countries/countries.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  id!:any;
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  show_activate:boolean = false;
  deleted_country!:number;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  img_path!:string;
  img!:any;
  Base64!:any;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_activate:boolean = false;
  loader_delete:boolean = false;
  searchText:string = "";
  checkedStatus: boolean = false;
  alertImgCreate: boolean = false;
  alertArabicCreate: boolean = false;
  alertEnglishCreate: boolean = false;
  alertImgUpdate: boolean = false;
  alertArabicUpdate: boolean = false;
  alertEnglishUpdate: boolean = false;
  Create_Form:FormGroup = new FormGroup ({
      name_ar  : new FormControl(null , [Validators.required]),
      name_en  : new FormControl(null , [Validators.required]),
      img_path : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      name_ar  : new FormControl(null , [Validators.required]),
      name_en  : new FormControl(null , [Validators.required]),
      img_path : new FormControl(null),
      id       : new FormControl(null , [Validators.required])
    }
  );
  constructor (
    private ActivatedRoute: ActivatedRoute,
    private toast: NgToastService,
    private Router: Router,
    private CountriesService: CountriesService,
    private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.countries();
  }
  countries() {
    this.CountriesService.showWithoutActive().subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
      }
    });
  }
  onFileSelected(event:any , key:string) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      if(this.alertImgCreate) {
        this.Base64 = "";
      } else if (!this.alertImgCreate) {
        this.Base64 = reader.result;
      }
    };
    if(key === "add") {
      if((file?.name).endsWith("svg")) {
        this.alertImgCreate = true;
      } else if((file?.name).endsWith("png") || (file?.name).endsWith("jpg") || (file?.name).endsWith("jpeg")) {
        this.Create_Form.patchValue ({
          img_path : file
        });
        this.alertImgCreate = false;
      }
    }
    else if(key === "update") {
      if((file?.name).endsWith("svg")) {
        this.alertImgUpdate = true;
      } else if((file?.name).endsWith("png") || (file?.name).endsWith("jpg") || (file?.name).endsWith("jpeg")) {
        this.Update_Form.patchValue ({
          img_path : file
        });
        this.alertImgUpdate = false;
      }
    }
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.Base64 = "";
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.CountriesService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          // this.show_create = false;
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          }
          // this.countries();
        }
      });
    }
  }
  checkisArabic(val: any) {
    if(!val) {
      this.alertArabicCreate = false;
    } else if(val && val != "") {
      if(/[\u0600-\u06FF]/.test(val) || /[\u0600-\u06FF\u0750-\u077F]/.test(val)) {
        this.alertArabicCreate = true;
      } else if(/^[A-Za-z0-9]*$/.test(val) || /^[a-z0-9]*$/i.test(val)) {
        this.alertArabicCreate = false;
      }
    }
  }
  checkisEnglish(val: any) {
    if(!val) {
      this.alertEnglishCreate = false;
    } else if(val && val != "") {
      if(/^[A-Za-z0-9]*$/.test(val) || /^[a-z0-9]*$/i.test(val)) {
        this.alertEnglishCreate = true;
      } else if (/[\u0600-\u06FF]/.test(val) || /[\u0600-\u06FF\u0750-\u077F]/.test(val)) {
        this.alertEnglishCreate = false;
      }
    }
  }
  checkisArabicUpdate(val: any) {
    if(!val) {
      this.alertArabicUpdate = false;
    } else if(val && val != "") {
      if(/[\u0600-\u06FF]/.test(val) || /[\u0600-\u06FF\u0750-\u077F]/.test(val)) {
        this.alertArabicUpdate = true;
      } else if(/^[A-Za-z0-9]*$/.test(val) || /^[a-z0-9]*$/i.test(val)) {
        this.alertArabicUpdate = false;
      }
    }
  }
  checkisEnglishUpdate(val: any) {
    if(!val) {
      this.alertEnglishUpdate = false;
    } else if(val && val != "") {
      if(/^[A-Za-z0-9]*$/.test(val) || /^[a-z0-9]*$/i.test(val)) {
        this.alertEnglishUpdate = true;
      } else if (/[\u0600-\u06FF]/.test(val) || /[\u0600-\u06FF\u0750-\u077F]/.test(val)) {
        this.alertEnglishUpdate = false;
      }
    }
  }
  close_create() {
    this.show_create = false;
    if(!this.show_create) {
      window.setTimeout(()=>{
        window.location.reload()
      },500);
    }
  }
  UpdateCountry(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      name_ar  : row.name_ar,
      name_en  : row.name_en,
      // img_path : row.img_path,
      id       : row.id
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.loader_update = false;
    this.img_path = "https://dev.generalhouseservices.com/" + row.img_path;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.CountriesService.update(Update_Form.value).subscribe ({
          next:(response)=> {
            this.loader_update = false;
            this.show_update = false;
            if(response?.status) {
              this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            }
            this.countries();
          }
        }
      );
    }
  }
  close_update() {
    this.show_update = false;
    if(!this.show_update) {
      window.setTimeout(()=>{
        window.location.reload()
      },500);
    }
  }
  CountryId(id:number) {
    this.deleted_country = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteCountry() {
    this.loader_delete = true;
    this.CountriesService.delete(this.deleted_country).subscribe ({
        next:(response)=> {
          this.loader_delete = false;
          this.show_delete = false;
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          this.countries();
        }
      }
    );
  }
  governorates(id:number) {
    this.Router.navigate(["countries/" + id + "/governorates"]);
  }
  filter(value:any) {
    if(!value) {
      this.countries();
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].name_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_en.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.datePipe.transform(this.rows[i].created_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())}) ! >= 0 ||
            this.datePipe.transform(this.rows[i].updated_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())}) ! >= 0) {
            this.temps.push(this.rows[i]);
        }
      }
      this.rows = this.temps;
      this.temps = [];
    }
  }
  cancelSearch() {
    this.searchText = "";
    this.countries();
  }
  active(id:any , active:any) {
    this.loader_activate = false;
    if(active) this.toggle = 0;
    else this.toggle = 1;
    this.active_id = id;
    this.show_activate = true;
    if(!this.toggle) {
      this.active_letter = "Are You Sure You Want Stopped This Country";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Country";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.CountriesService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.countries();
      }
    });
  }
  update_active(event:any) {
    if(event.currentTarget.checked) {}
  }
}
