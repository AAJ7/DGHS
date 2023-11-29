import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FooterService } from 'src/app/core/services/footer/footer.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  deleted_SocialLinksId!:number;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  img_path!:string;
  img!:any;
  Base64!:any;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_delete:boolean = false;
  searchText:string = "";
  Create_Form:FormGroup = new FormGroup({
      img_path   : new FormControl(null , [Validators.required]),
      link       : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup({
      id         : new FormControl(null , [Validators.required]),
      img_path   : new FormControl(null),
      link       : new FormControl(null , [Validators.required])
    }
  );
  constructor(private FooterService:FooterService , private toast:NgToastService,private datePipe: DatePipe) {
  }
  ngOnInit(): void {
    this.SocialLinks();
  }
  SocialLinks() {
    this.FooterService.show().subscribe ({
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
      this.FooterService.create(Create_Form.value).subscribe ({
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
  UpdateFooter(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      link    : row.link,
  // img_path : row.img_path,
      id      : row.id,
    });
    this.img_path = "https://dev.generalhouseservices.com/" + row.img_path;
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.FooterService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_update = false;
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
  GetFooterId(id:number) {
    this.deleted_SocialLinksId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  DeleteFooter() {
    this.loader_delete = true;
    this.FooterService.delete(this.deleted_SocialLinksId).subscribe ({
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
            this.rows[i].link.toLowerCase().includes(value.trim().toLowerCase()) ||
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
