import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderStepsService } from 'src/app/core/services/Order-steps/order-steps.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-order-steps',
  templateUrl: './order-steps.component.html',
  styleUrls: ['./order-steps.component.scss']
})
export class OrderStepsComponent implements OnInit  {
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  show_activate:boolean = false;
  deleted_StepOrdersId!:number;
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
  Create_Form:FormGroup = new FormGroup ({
      title_ar       : new FormControl(null , [Validators.required]),
      title_en       : new FormControl(null , [Validators.required]),
      description_ar : new FormControl(null , [Validators.required]),
      description_en : new FormControl(null , [Validators.required]),
      img_path       : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      title_ar       : new FormControl(null , [Validators.required]),
      title_en       : new FormControl(null , [Validators.required]),
      description_ar : new FormControl(null , [Validators.required]),
      description_en : new FormControl(null , [Validators.required]),
      img_path       : new FormControl(null),
      id             : new FormControl(null , [Validators.required]),
      active         : new FormControl(null , [Validators.required]),
    }
  );
  constructor(private OrderStepsService:OrderStepsService , private toast:NgToastService,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.OrderSteps();
  }
  OrderSteps() {
    this.OrderStepsService.show().subscribe ({
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
      this.Base64 = reader.result;
    };
    if(key === "add") {
      this.Create_Form.patchValue ({
        img_path : file
      });
    }
    else if(key === "update") {
      this.Update_Form.patchValue ({
        img_path : file
      });
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
      this.OrderStepsService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          this.show_create = false;
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"The image must be type of png , jpg , jpeg",duration:5000});
          }
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
  UpdateOrderSteps(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      title_ar       : row.title_ar,
      title_en       : row.title_en,
      description_ar : row. description_ar,
      description_en : row. description_en,
  // img_path        : row.img_path,
      id             : row.id,
      active         : row.active
    });
    this.img_path = "https://dev.generalhouseservices.com/" + row.img_path;
    this.loader_delete = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.OrderStepsService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_delete = false;
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"The image must be type of png , jpg , jpeg",duration:5000});
          }
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
          this.show_update = false;
        }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetDeleteOrderStepsId(id:number) {
    this.deleted_StepOrdersId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteOrderStep() {
    this.loader_delete = true;
    this.OrderStepsService.delete(this.deleted_StepOrdersId).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload();
          },5001);
        }
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
            this.rows[i].title_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].title_en.toLowerCase().includes(value.trim().toLowerCase()) ||
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
      this.active_letter = "Are You Sure You Want Stopped This Order Step";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Order Step";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.OrderStepsService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.OrderSteps();
      }
    });
  }
}
