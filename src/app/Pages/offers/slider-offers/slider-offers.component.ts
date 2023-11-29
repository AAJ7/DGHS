import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SliderOffersService } from 'src/app/core/services/Slider-Offers/slider-offers.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-slider-offers',
  templateUrl: './slider-offers.component.html',
  styleUrls: ['./slider-offers.component.scss']
})
export class SliderOffersComponent implements OnInit {
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  show_activate:boolean = false;
  deleted_SliderOffersId!:number;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  rows_from:any[] = [];
  rows_to:any[] = [];
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
  fromDate!:any;
  toDate!:any;
  Create_Form:FormGroup = new FormGroup ({
      link  : new FormControl(null , [Validators.required]),
      from  : new FormControl(null , [Validators.required]),
      to    : new FormControl(null , [Validators.required]),
      img_path : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      link     : new FormControl(null , [Validators.required]),
      from     : new FormControl(null , [Validators.required]),
      to       : new FormControl(null , [Validators.required]),
      img_path : new FormControl(null),
      id       : new FormControl(null , [Validators.required])

    }
  );
  constructor(private SliderOffersService:SliderOffersService , private toast:NgToastService,private datePipe: DatePipe) {
  }
  ngOnInit(): void {
    this.SliderOrders();
  }
  SliderOrders() {
    this.SliderOffersService.show().subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
        for(let i = 0; i < response?.data.length; ++i) {
          this.rows_from.push(response?.data[i]?.from);
          this.rows_to.push(response?.data[i]?.to);
        }
      }
    });
  }
  onChangeFromDate(event:any) {
    this.temps = [];
    this.temp = [];
    if(event?.target?.value) {
      this.fromDate = event?.target?.value;
      if(this.fromDate && this.toDate) {
        for(let i = 0; i < this.rows.length; ++i) {
          if((this.fromDate > this.rows[i].from && this.fromDate < this.rows[i].to) || (this.toDate > this.rows[i].to && this.toDate < this.rows[i].to)) {
            this.temps.push(this.rows[i]);
          }
        }
        this.rows = this.temps;
        this.temp = this.temps;
        this.temps = [];
      }
    }
  }
  onChangeToDate(event:any) {
    this.temps = [];
    this.temp = [];
    if(event?.target?.value) {
      this.toDate = event?.target?.value;
      if(this.fromDate && this.toDate) {
        for(let i = 0; i < this.rows.length; ++i) {
          if((this.fromDate > this.rows[i].from && this.fromDate < this.rows[i].to) || (this.toDate > this.rows[i].to && this.toDate < this.rows[i].to)) {
            this.temps.push(this.rows[i]);
          }
        }
        this.rows = this.temps;
        this.temp = this.temps;
        this.temps = [];
      }
    }
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
      if(!(Create_Form.value.from < Create_Form.value.to)) {
        this.toast.error({detail:"ERROR",summary:"ERROR in dates",duration:5000});
        this.close_create();
        return;
      }
      this.loader_create = true;
      this.SliderOffersService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"The image must be type of png , jpg , jpeg",duration:5000});
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
  UpdateSliderOffer(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      link     : row.link,
      from     : row.from.slice(0, -3),
      to       : row.to.slice(0, -3),
   // img_path : row.img_path,
      id       : row.id,
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.img_path = "https://dev.generalhouseservices.com/" + row.img_path;
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.SliderOffersService.update(Update_Form.value).subscribe ({
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
              if(!response?.status)this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
          this.show_update = false;
        }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetSliderOffersId(id:number) {
    this.deleted_SliderOffersId = id;
    this.show_delete = true;
  }
  deleteSliderOffer() {
    this.loader_delete = true;
    this.SliderOffersService.delete(this.deleted_SliderOffersId).subscribe ({
      next:(response)=> {
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload();
          },5001);
        }
        this.loader_delete = false;
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
            this.rows[i].link.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.datePipe.transform(this.rows[i].from, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())})! >= 0 ||
            this.datePipe.transform(this.rows[i].to, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())})! >= 0 ||
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
      this.active_letter = "Are You Sure You Want Stopped This Slider Code Offer";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Slider Code Offer";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.SliderOffersService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.
        SliderOrders();
      }
    });
  }
  from_datetime(event:any) {
    event = event.replace("T" , " ");
    this.Create_Form.patchValue ({
      from : event
    });
  }
  to_datetime(event:any) {
    event = event.replace("T" , " ");
    this.Create_Form.patchValue ({
      to : event
    });
  }
  from_datetime_update(event:any) {
    event = event.replace("T" , " ");
    this.Update_Form.patchValue ({
      from : event
    });
  }
  to_datetime_update(event:any) {
    event = event.replace("T" , " ");
    this.Update_Form.patchValue ({
      to : event
    });
  }
  update_active(event:any) {
    if(event.currentTarget.checked) {}
  }
}
