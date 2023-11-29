import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AdminsService } from 'src/app/core/services/admins/admins.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  deleted_AdminId!:any;
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  deleted_adminId!:number;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  show_activate:boolean = false;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_activate:boolean = false;
  loader_delete:boolean = false;
  searchText:string = "";
  checkedStatus: boolean = false;
  Create_Form:FormGroup = new FormGroup ({
      name             : new FormControl(null , [Validators.required]),
      email            : new FormControl(null , [Validators.required,Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )]),
      phone            : new FormControl(null , [Validators.required]),
      password         : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      name       : new FormControl(null , [Validators.required]),
      phone      : new FormControl(null , [Validators.required]),
      email      : new FormControl(null , [Validators.required,Validators.email]),
      id         : new FormControl(null , [Validators.required]),
      password : new FormControl(null),
    }
  );
  constructor(private AdminsService:AdminsService,private toast:NgToastService,private datePipe: DatePipe) {}

  ngOnInit(): void {
  this.admins();
}
  admins() {
    this.rows = [];
    this.temp = [];
    this.AdminsService.user().subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
      }
    });
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.show_create = true;
    this.loader_create = false;
  }

  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.AdminsService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
       // this.show_create = false;
          if(!response?.status) {
            if(response?.message?.email) {
              this.toast.error({detail:"ERROR",summary:response?.message?.email[0],duration:5000});
            }
            if(response?.message?.phone) {
              this.toast.error({detail:"ERROR",summary:response?.message?.phone[0],duration:5000});
            }
            if(response?.message?.phone && response?.message?.email) {
              this.toast.error({detail:"ERROR",summary:`${response?.message?.phone[0]} & ${response?.message?.email[0]}`,duration:5000});
            }
          }
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          }
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
    if(!this.show_create) {
      window.setTimeout(()=>{
        window.location.reload();
      },1);
    }
  }
  UpdateAdmin(row:any) {
    this.Update_Form.patchValue({
      name       : row.name,
      phone      : row.phone,
      id         : row.id,
      email      : row.email,
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.loader_update = false;
    this.show_update = true;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.AdminsService.update(Update_Form.value).subscribe ({
       next:(response)=> {
        this.loader_update = false;
     // this.show_update = false;
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        }
        if(!response?.status) {
          if(response?.message?.email) {
            this.toast.error({detail:"ERROR",summary:response?.message?.email[0],duration:5000});
          }
          if(response?.message?.phone) {
            this.toast.error({detail:"ERROR",summary:response?.message?.phone[0],duration:5000});
          }
          if(response?.message?.phone && response?.message?.email) {
            this.toast.error({detail:"ERROR",summary:`${response?.message?.phone[0]} & ${response?.message?.email[0]}`,duration:5000});
          }
        }
       }
      });
    }
  }
  close_update() {
    this.show_update = false;
    if(!this.show_update) {
       window.setTimeout(()=> {
            window.location.reload();
          },1);
    }
  }
  GetDeleteAdminId(id:number) {
    this.deleted_AdminId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteAdmin() {
    this.loader_delete = true;
    this.AdminsService.delete(this.deleted_AdminId).subscribe ({
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
      this.active_letter = "Are You Sure You Want Stopped This Admin";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Admin";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.AdminsService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.admins();
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
            this.rows[i].phone.toString().includes(value.trim()) ||
            this.rows[i].name.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].email.toLowerCase().includes(value.trim().toLowerCase()) ||
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
