import { PromoCodeService } from './../../../core/services/Promo-Code/promo-code.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PromoCodeOffersService } from './../../../core/services/PromoCodeOffers/promo-code-offers.service';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-promo-code-offers',
  templateUrl: './promo-code-offers.component.html',
  styleUrls: ['./promo-code-offers.component.scss']
})
export class PromoCodeOffersComponent implements OnInit {
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  show_activate:boolean = false;
  PromoCodeId:any[] = [];
  deleted_PromoCodeId!:number;
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
  Create_Form:FormGroup = new FormGroup({
      img_path       : new FormControl(null , [Validators.required]),
      promo_code_id  : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup({
      img_path       : new FormControl(null),
      promo_code_id  : new FormControl(null , [Validators.required]),
      id             : new FormControl(null , [Validators.required]),
    }
  );
  constructor(
    private PromoCodeOffersService: PromoCodeOffersService,
    private toast: NgToastService, private PromoCodeService: PromoCodeService,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.PromoCodeOffers();
    this.getPromoCodes();
  }
  PromoCodeOffers() {
    this.rows = [];
    this.temp = [];
    this.PromoCodeOffersService.show().subscribe({
      next:(response)=> {
        this.rows = [];
        this.temp = [];
        for(let i = 0; i < response?.data.length; ++i) {
          let obj = {
            id            : response?.data[i]?.id,
            promo_code_id : response?.data[i]?.promo_code_id,
            active        : response?.data[i]?.active,
            created_at    : response?.data[i]?.created_at,
            updated_at    : response?.data[i]?.updated_at,
            promo_code    : response?.data[i]?.promo_code?.code,
            from          : response?.data[i]?.promo_code?.from,
            to            : response?.data[i]?.promo_code?.to,
            img_path      : response?.data[i]?.img_path
          }
          this.rows.push(obj);
          this.temp.push(obj);
        }
      }
    });
  }
  getPromoCodes() {
    this.PromoCodeId = [];
    this.PromoCodeService.show().subscribe ({
      next:(response)=> {
        this.PromoCodeId = [];
        for(let i = 0; i<response?.data.length; ++i) {
          this.PromoCodeId.push({id : response?.data[i]?.id , code : response?.data[i]?.code});
        }
      }
    });
  }
  onChangePromoCode(event:any) {
    if(event?.target?.value && event?.target?.value != "all") {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].promo_code.toLowerCase().includes((event?.target?.value).trim().toLowerCase())) {
            this.temps.push(this.rows[i]);
        }
      }
      this.rows = this.temps;
      this.temps = [];
    } else if(event?.target?.value && event?.target?.value === "all") {
      this.PromoCodeOffers();
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
    this.getPromoCodes();
    this.Base64 = "";
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.PromoCodeOffersService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          this.show_create = false;
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
          if(!response?.status)this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  UpdatePromoCodeOffer(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      promo_code_id : row.promo_code_id,
      id            : row.id,
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.img_path = "https://dev.generalhouseservices.com/" + row.img_path;
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.PromoCodeOffersService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"The image must be type of png , jpg , jpeg",duration:5000});
          }
          if(!response.status)this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
          this.show_update = false;
          this.loader_update = true;
        }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetPromoCodeOfferId(id:number) {
    this.deleted_PromoCodeId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deletePromoCodeOffer() {
    this.loader_delete = true;
    this.PromoCodeOffersService.delete(this.deleted_PromoCodeId).subscribe ({
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
      this.active_letter = "Are You Sure You Want Stopped This Promo Code Offer";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Promo Code Offer";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.PromoCodeOffersService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.PromoCodeOffers();
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
            this.rows[i].promo_code_id.toString().includes(value.trim()) ||
            this.rows[i].promo_code.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
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
