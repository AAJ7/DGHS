import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { CitiesService } from 'src/app/core/services/Cities/cities.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  id!:any;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  show_option:boolean = false;
  deleted_City!:number;
  show_stop:boolean = false;
  show_activate:boolean = false;
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
  Laundry:boolean = false;
  Paints:boolean = false;
  searchText:string = "";
  Spraying_pesticides_for_homes:boolean = false;
  Spraying_pesticides_for_gardens:boolean = false;
  House_foundation_cleaning:boolean = false;
  sterilization:boolean = false;
  Sewing_and_mending_clothes:boolean = false;
  Shoe_repair:boolean = false;
  Deep_cleaning:boolean = false;

  Create_Form:FormGroup = new FormGroup
  (
    {
      name_ar         : new FormControl(null , [Validators.required]),
      name_en         : new FormControl(null , [Validators.required]),
      governorate_id  : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup
  (
    {
      name_ar         : new FormControl(null , [Validators.required]),
      name_en         : new FormControl(null , [Validators.required]),
      id              : new FormControl(null , [Validators.required]),
      governorate_id  : new FormControl(null , [Validators.required])
    }
  );
  constructor(private ActivatedRoute: ActivatedRoute , private toast:NgToastService , private Router:Router , private CitiesService:CitiesService,private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.Cities(this.id);
  }
  Cities(id:number) {
   this.CitiesService.show(id).subscribe ({
    next:(response)=> {
      this.rows = response?.data;
      this.temp = response?.data;
    }
   });
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.Create_Form.patchValue ({
      governorate_id : this.id
    });
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.CitiesService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          this.show_create = false;
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          this.Cities(this.id);
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  UpdateCity(row:any)
  {
    this.show_update = true;
    this.Update_Form.patchValue({
      name_ar        : row.name_ar,
      name_en        : row.name_en,
      id             : row.id,
      governorate_id : this.id
    });
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.CitiesService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_update = false;
          this.show_update = false;
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          this.Cities(this.id);
        }
      }
    );
    }
  }
  close_update() {
    this.show_update = false;
  }
  filter(value:any) {
    if(!value) {
      this.Cities(this.id);
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].governorate_id.toString().includes(value.trim()) ||
            this.rows[i].name_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_en.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.datePipe.transform(this.rows[i].created_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())}) ! >= 0 ||
            this.datePipe.transform(this.rows[i].deleted_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())}) ! >= 0 ||
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
    this.Cities(this.id);
  }
  DeleteCityId(id:number) {
    this.deleted_City = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteCity()
  {
    this.loader_delete = true;
    this.CitiesService.delete(this.deleted_City).subscribe ({
      next:(response)=>{
        this.loader_delete = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.Cities(this.id);
        this.show_delete = false;
      }
    });
  }
  active(id:any , active:any) {
    this.loader_activate = false;
    if(active) this.toggle = 0;
    else this.toggle = 1;
    this.active_id = id;
    this.show_activate = true;
    if(!this.toggle) {
      this.active_letter = "Are You Sure You Want Stopped This City";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This City";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.CitiesService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.Cities(this.id);
      }
    });
  }
  CheckBox(which:any) {
    if(which == "Laundry")this.Laundry = !this.Laundry;
    if(which == "Paints")this.Paints = !this.Paints;
    if(which == "Spraying_pesticides_for_homes")this.Spraying_pesticides_for_homes = !this.Spraying_pesticides_for_homes;
    if(which == "Spraying_pesticides_for_gardens")this.Spraying_pesticides_for_gardens = !this. Spraying_pesticides_for_gardens;
    if(which == "House_foundation_cleaning")this.House_foundation_cleaning = !this.House_foundation_cleaning;
    if(which == "sterilization")this.sterilization = !this.sterilization;
    if(which == "Sewing_and_mending_clothes")this.Sewing_and_mending_clothes = !this.Sewing_and_mending_clothes;
    if(which == "Shoe_repair")this.Shoe_repair = !this.Shoe_repair;
    if(which == "Deep_cleaning")this.Deep_cleaning = !this.Deep_cleaning;
  }
  CheckBox_open() {
    this.show_option = true;
  }
  close_option() {
    this.show_option = false;
  }
}
