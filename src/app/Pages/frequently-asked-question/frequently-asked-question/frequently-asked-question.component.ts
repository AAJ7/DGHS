import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrequentlyAskedQuestionService } from 'src/app/core/services/frequently_asked_question/frequently-asked-question.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-frequently-asked-question',
  templateUrl: './frequently-asked-question.component.html',
  styleUrls: ['./frequently-asked-question.component.scss']
})
export class FrequentlyAskedQuestionComponent implements OnInit {
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  deleted_frequently_asked_questionId!:number;
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
      question_ar  : new FormControl(null , [Validators.required]),
      question_en  : new FormControl(null , [Validators.required]),
      answer_ar    : new FormControl(null , [Validators.required]),
      answer_en    : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup({
      question_ar  : new FormControl(null , [Validators.required]),
      question_en  : new FormControl(null , [Validators.required]),
      answer_ar    : new FormControl(null , [Validators.required]),
      answer_en    : new FormControl(null , [Validators.required]),
      id           : new FormControl(null , [Validators.required])

    }
  );
  constructor(private FrequentlyAskedQuestionService:FrequentlyAskedQuestionService , private toast:NgToastService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.frequently_asked_question();
  }
  frequently_asked_question() {
    this.FrequentlyAskedQuestionService.show().subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
      }
    });
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.Base64 = "";
    this.show_create = true;
    this.loader_create= false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create= true;
      this.FrequentlyAskedQuestionService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create= false;
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
  Updatefrequently_asked_question(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      question_ar  : row.question_ar,
      question_en  : row.question_en,
      answer_ar    : row.answer_ar,
      answer_en    : row.answer_en,
  // img_path      : row.img_path,
      id           : row.id,
    });
    this.img_path = "https://dev.generalhouseservices.com/" + row.img_path;
    this.loader_update= false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update= true;
      this.FrequentlyAskedQuestionService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_update= false;
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
  Getfrequently_asked_questionId(id:number) {
    this.deleted_frequently_asked_questionId = id;
    this.show_delete = true;
    this.loader_delete= false;
  }
  deletefrequently_asked_question() {
    this.loader_delete= true;
    this.FrequentlyAskedQuestionService.delete(this.deleted_frequently_asked_questionId).subscribe ({
      next:(response)=> {
        this.loader_delete= false;
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
            this.rows[i].question_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].question_en.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].answer_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].answer_en.toLowerCase().includes(value.trim().toLowerCase()) ||
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
