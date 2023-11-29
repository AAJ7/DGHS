import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrequentlyAskedQuestionService {


  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("frequently_asked_question");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('question_ar', data.question_ar)
    formData.append('question_en', data.question_en)
    formData.append('answer_ar' , data.answer_ar)
    formData.append('answer_en' , data.answer_en)
    return this.HttpClient.post<any>("frequently_asked_question" , formData);
  }
  update(data:any) {
    const formData = new FormData();
    formData.append('question_ar', data.question_ar)
    formData.append('question_en', data.question_en)
    formData.append('answer_ar' , data.answer_ar)
    formData.append('answer_en' , data.answer_en)
    formData.append('id' , data.id)
    return this.HttpClient.post<any>("frequently_asked_question/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("frequently_asked_question/" + id);
  }

}
