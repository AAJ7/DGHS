import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , FormBuilder , FormArray } from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DatePipe } from '@angular/common';
import { HaveSubCategoriesService } from 'src/app/core/services/have-sub-categories/have-sub-categories.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';


@Component({
  selector: 'app-have-sub-categories',
  templateUrl: './have-sub-categories.component.html',
  styleUrls: ['./have-sub-categories.component.scss']
})
export class HaveSubCategoriesComponent implements OnInit {

  id!:any;
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_activate:boolean = false;
  show_stop:boolean = false;
  isChecked:boolean = false;
  Activated_id!:number;
  deleted_CategoryId!:number;
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
  checkedStatus: boolean = false;
  CategoryCheckBoxCreate:boolean = false;
  CategoryCheckBoxUpdate:boolean = false;
  object!:any;
  CategoryName!:any;
  Create_Form:FormGroup = new FormGroup ({
      name_ar             : new FormControl(null , [Validators.required]),
      name_en             : new FormControl(null , [Validators.required]),
      img_path            : new FormControl(null , [Validators.required]),
      parent_id           : new FormControl(null , [Validators.required]),
      have_sub_categories : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      name_ar             : new FormControl(null , [Validators.required]),
      name_en             : new FormControl(null , [Validators.required]),
      img_path            : new FormControl(null),
      id                  : new FormControl(null , [Validators.required]),
      active              : new FormControl(null , [Validators.required]),
      have_sub_categories : new FormControl(null , [Validators.required]),
      parent_id           : new FormControl(null , [Validators.required]),
    }
  );

  constructor(
    private datePipe: DatePipe,
    private ActivatedRoute: ActivatedRoute,
    private toast: NgToastService,
    private Router: Router,
    private HaveSubCategoriesService: HaveSubCategoriesService,
    private CategoriesService: CategoriesService) { }
  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.Categories(this.id);
    this.Router.events.subscribe(() => {
      this.id = this.ActivatedRoute.snapshot.params['id'];
      this.getCategories(this.id);
  });
  }
  getCategories(id:any) {
    this.CategoriesService.show().subscribe ({
      next:(response)=> {
        this.object = response?.data.find((item:any) => item.id == id);
        this.img = "https://dev.generalhouseservices.com/" + this.object.img_path;
        this.CategoryName = this.object.name_en;
      }
    });
  }

  Categories(id:any) {
    this.HaveSubCategoriesService.show(id).subscribe ({
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
  CheckBoxUpdate() {
    this.CategoryCheckBoxUpdate = !this.CategoryCheckBoxUpdate;
    if(this.CategoryCheckBoxUpdate) {
      this.Update_Form.patchValue ({
        have_sub_categories : 1
      });
    }
    else {
      this.Update_Form
      .patchValue ({
        have_sub_categories : 0
      });
    }
  }
  CheckBoxCreate() {
    this.CategoryCheckBoxCreate = !this.CategoryCheckBoxCreate;
    if(this.CategoryCheckBoxCreate) {
      this.Create_Form.patchValue ({
        have_sub_categories : 1
      });
    }
    else {
      this.Create_Form.patchValue ({
        have_sub_categories : 0
      });
    }
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.Base64 = "";
    this.show_create = true;
    this.Create_Form.patchValue ({
      have_sub_categories : 0,
      parent_id           : this.id
    });
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.HaveSubCategoriesService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"Image must be type of png,jpg,jpeg",duration:5000});
          }
          this.loader_create = false;
          this.show_create = false;
          if(response.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {window.location.reload();},5001);
          }
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  UpdateCategory(row:any) {
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.show_update = true;
    this.Update_Form.patchValue({
      name_ar             : row.name_ar,
      name_en             : row.name_en,
      id                  : row.id,
      active              : row.active,
      parent_id           : row.parent_id,
      have_sub_categories : row.have_sub_categories
    });
    this.img_path = "https://dev.generalhouseservices.com/" + row.img_path;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      console.log(Update_Form.value);
       this.loader_update = true;
      this.HaveSubCategoriesService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_update = false;
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"Image must be type of png,jpg,jpeg",duration:5000});
          }
          if(response.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {window.location.reload();},5001);
          }
          this.show_update = false;
        }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetCategoryId(id:number) {
    this.deleted_CategoryId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteCategory() {
    this.loader_delete = true;
    this.HaveSubCategoriesService.delete(this.deleted_CategoryId).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        this.show_delete = false;
        if(response.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=>{window.location.reload();},5001);
        }
      }
    });
  }
  CategoriesCompanies(id:number) {
    this.Router.navigate(["categories/" + "company/" + id]);
  }
  filter(value:any) {
    if(!value) {
      this.Categories(this.id);
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].have_sub_categories.toString().includes(value.trim()) ||
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
    window.location.reload();
  }
  update_active(event:any) {
    if(event.currentTarget.checked) {}
  }
}
