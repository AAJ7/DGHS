import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentMethodsService } from 'src/app/core/services/Payment-Methods/payment-methods.service';
import { NgToastService } from 'ng-angular-popup';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  show_activate:boolean = false;
  deleted_PaymentMethod!:number;
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
  Create_Form:FormGroup = new FormGroup ({
      title_ar  : new FormControl(null , [Validators.required]),
      title_en  : new FormControl(null , [Validators.required]),
      img_path : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      title_ar : new FormControl(null , [Validators.required]),
      title_en : new FormControl(null , [Validators.required]),
      img_path : new FormControl(null),
      id       : new FormControl(null , [Validators.required]),
      active   : new FormControl(null , [Validators.required])
    }
  );
  constructor(private PaymentMethodsService:PaymentMethodsService, private toast:NgToastService,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.PaymentMethods();
  }
  PaymentMethods() {
    this.PaymentMethodsService.show().subscribe ({
        next:(response)=> {
          this.rows = response?.data;
          this.temp = response?.data;
        }
      }
    );
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
      this.PaymentMethodsService.create(Create_Form.value).subscribe ({
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
  UpdatePaymentMethod(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      title_ar  : row.title_ar,
      title_en  : row.title_en,
      // img_path : row.img_path,
      id       : row.id,
      active   : row.active
    });
    this.img_path = "https://dev.generalhouseservices.com/" + row.img_path;
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.PaymentMethodsService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_update = false;
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
  GetPaymentMethodId(id:number) {
    this.deleted_PaymentMethod = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deletePaymentMethod() {
    this.loader_delete = true;
    this.PaymentMethodsService.delete(this.deleted_PaymentMethod).subscribe ({
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
  active(id:any , active:any) {
    this.loader_activate = false;
    if(active) this.toggle = 0;
    else this.toggle = 1;
    this.active_id = id;
    this.show_activate = true;
    if(!this.toggle) {
      this.active_letter = "Are You Sure You Want Stopped This Payemnt";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Payemnt ";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.PaymentMethodsService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.PaymentMethods();
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
}
