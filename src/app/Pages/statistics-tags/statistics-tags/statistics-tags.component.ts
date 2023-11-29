import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatisticsTagsService } from 'src/app/core/services/Statistics-Tags/statistics-tags.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-statistics-tags',
  templateUrl: './statistics-tags.component.html',
  styleUrls: ['./statistics-tags.component.scss']
})
export class StatisticsTagsComponent implements OnInit {
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  deleted_StatisticsTagsId!:number;
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
      title_ar   : new FormControl(null , [Validators.required]),
      title_en   : new FormControl(null , [Validators.required]),
      img_path   : new FormControl(null , [Validators.required]),
      percentage : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup({
      title_ar   : new FormControl(null , [Validators.required]),
      title_en   : new FormControl(null , [Validators.required]),
      percentage : new FormControl(null , [Validators.required]),
      id         : new FormControl(null , [Validators.required]),
      img_path   : new FormControl(null),
    }
  );
  constructor(private datePipe: DatePipe,private StatisticsTagsService:StatisticsTagsService , private toast:NgToastService) {}
  ngOnInit(): void {
    this.StatiticsTag();
  }
  StatiticsTag() {
    this.StatisticsTagsService.show().subscribe ({
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
      this.StatisticsTagsService.create(Create_Form.value).subscribe ({
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
  UpdateStatiticsTag(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      title_ar  : row.title_ar,
      title_en  : row.title_en,
  // img_path   : row.img_path,
      id         : row.id,
      percentage : row.percentage
    });
    this.img_path = "https://dev.generalhouseservices.com/" + row.img_path;
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.StatisticsTagsService.update(Update_Form.value).subscribe ({
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
  GetStatiticsTagId(id:number) {
    this.deleted_StatisticsTagsId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteStatisticsTags() {
    this.loader_delete = true;
    this.StatisticsTagsService.delete(this.deleted_StatisticsTagsId).subscribe ({
      next:(response)=> {
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload();
          },5001);
        }
        this.show_delete = false;
        this.loader_delete = false;
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
            this.rows[i].percentage.toString().includes(value.trim()) ||
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
    this.StatiticsTag();
    if(!this.searchText) {
      window.location.reload();
    }
  }
}
