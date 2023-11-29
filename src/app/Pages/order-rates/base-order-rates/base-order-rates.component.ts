import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { OrderRatesService } from 'src/app/core/services/order-rates/order-rates.service';


@Component({
  selector: 'app-base-order-rates',
  templateUrl: './base-order-rates.component.html',
  styleUrls: ['./base-order-rates.component.scss']
})
export class BaseOrderRatesComponent implements OnInit {
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  show_activate:boolean = false;
  deleted_BaseOrdersRatesId!:number;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  img_path!:string;
  img!:any;
  Base64!:any;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_delete:boolean = false;
  loader_activate:boolean = false;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  searchText:string = "";
  checkedStatus: boolean = false;
  Create_Form:FormGroup = new FormGroup ({
      name_ar       : new FormControl(null , [Validators.required]),
      name_en       : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      name_ar       : new FormControl(null , [Validators.required]),
      name_en       : new FormControl(null , [Validators.required]),
      id            : new FormControl(null , [Validators.required]),
    }
  );
  constructor(private OrderRatesService: OrderRatesService , private toast:NgToastService , private datePipe: DatePipe) {

  }


  ngOnInit(): void {
    this.show();
  }
  show() {
    this.OrderRatesService.show().subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
      }
    })
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
      this.OrderRatesService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
          this.loader_create = false;
          this.show_create = false;
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  UpdateOrderSteps(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      name_ar       : row.name_ar,
      name_en       : row.name_en,
      id             : row.id,
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.loader_delete = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.OrderRatesService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
          this.loader_delete = false;
          this.show_update = false;
        }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetDeleteOrderStepsId(id:number) {
    this.deleted_BaseOrdersRatesId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteOrderStep() {
    this.loader_delete = true;
    this.OrderRatesService.delete(this.deleted_BaseOrdersRatesId).subscribe ({
      next:(response)=> {
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload();
          },5001);
        }
        this.loader_delete = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.show_delete = false;
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
    if(!this.searchText) {
      window.location.reload();
    }
  }
  update_active(event:any) {
    if(event.currentTarget.checked) {}
  }
}
