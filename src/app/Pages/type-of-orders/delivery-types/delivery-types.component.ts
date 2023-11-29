import { DeliveryTypesService } from './../../../core/services/Delivery-Types/delivery-types.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-delivery-types',
  templateUrl: './delivery-types.component.html',
  styleUrls: ['./delivery-types.component.scss']
})
export class DeliveryTypesComponent {
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  show_activate:boolean = false;
  deleted_Delivery_Type!:number;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_delete:boolean = false;
  loader_activate:boolean = false;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  searchText:string = "";
  Create_Form:FormGroup = new FormGroup({
      name_ar          : new FormControl(null , [Validators.required]),
      name_en          : new FormControl(null , [Validators.required]),
      description_ar   : new FormControl(null , [Validators.required]),
      description_en   : new FormControl(null , [Validators.required]),
      after_hours      : new FormControl(null , [Validators.required]),
      added_value      : new FormControl(null , [Validators.required]),
      added_value_type : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup({
      id               : new FormControl(null , [Validators.required]),
      name_ar          : new FormControl(null , [Validators.required]),
      name_en          : new FormControl(null , [Validators.required]),
      description_ar   : new FormControl(null , [Validators.required]),
      description_en   : new FormControl(null , [Validators.required]),
      after_hours      : new FormControl(null , [Validators.required]),
      added_value      : new FormControl(null , [Validators.required]),
      added_value_type : new FormControl(null , [Validators.required]),
    }
  );
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  constructor(private datePipe: DatePipe,private ActivatedRoute: ActivatedRoute , private DeliveryTypesService:DeliveryTypesService , private toast:NgToastService , private Router:Router) { }

  ngOnInit(): void {
    this.DeliveryTypes();
  }
  DeliveryTypes() {
    this.DeliveryTypesService.show().subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
      }
      }
    );
  }

  openCreateForm() {
    this.Create_Form.reset();
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.DeliveryTypesService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          this.show_create = false;
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }

  UpdateDeliveryType(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      name_ar        : row.name_ar,
      name_en        : row.name_en,
      id             : row.id,
      description_ar : row. description_ar,
      description_en : row. description_en,
      after_hours      : row.after_hours,
      added_value      : row.added_value,
      added_value_type : row.added_value_type,
    });
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.DeliveryTypesService.update(Update_Form.value).subscribe ({
        next : (response)=> {
          this.loader_update = false;
          this.show_update = false;
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
        }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }

  GetDeleteDeliveryTypeId(id:number) {
    this.deleted_Delivery_Type = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteDeliveryType() {
    this.loader_delete = true;
    this.DeliveryTypesService.delete(this.deleted_Delivery_Type).subscribe ({
      next:(response)=> {
          this.show_delete = false;
          this.loader_delete = false;
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
      }
    });
  }
  filter(value:any) {
    if(!value) {
      window.location.reload();
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].added_value.toString().includes(value.trim()) ||
            this.rows[i].after_hours.toString().includes(value.trim()) ||
            this.rows[i].added_value_type.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_en.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].description_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].description_en.toLowerCase().includes(value.trim().toLowerCase()) ||
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
    if(!this.searchText) {
      window.location.reload();
    }
  }
  active(id:any , active:any) {
    this.loader_activate = false;
    if(active) this.toggle = 0;
    else this.toggle = 1;
    this.active_id = id;
    this.show_activate = true;
    if(!this.toggle) {
      this.active_letter = "Are You Sure You Want Stopped This Delivery Type";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Delivery Type";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.DeliveryTypesService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.DeliveryTypes();
      }
    });
  }
}
