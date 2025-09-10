import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson, LessonWithProgressResponse } from '../../models/Lesson';
import { DataPaged } from '../../models/Data';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LessonService{
  private static readonly LESSON_URL = 'http://localhost:8080/api/v1/user/lessons'
  private static readonly LESSON_PAGED_URL = 'http://localhost:8080/api/v1/admin/lessons'

  id: number = 0;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  params: HttpParams = new HttpParams().set('page', 1).set('size', 10);

  getDetailLessonById(id: number): Observable<Lesson> {
    return this.httpClient.get<Lesson>(`${LessonService.LESSON_URL}/${id}`);
  }

  getLessonPaged(page: number, size: number): Observable<DataPaged<Lesson>> {
    if (page != null && size != null) {
      this.params = new HttpParams().set('page', page).set('size', size);
    }
    return this.httpClient.get<DataPaged<Lesson>>(`${LessonService.LESSON_PAGED_URL}`, { params: this.params });
  }

  createLesson(form: FormData){
    return this.httpClient.post(LessonService.LESSON_PAGED_URL, form)
  }

  getLessonByLevelAndCategory(categoryId: number, level: string){
    let paramsDif: HttpParams = new HttpParams();
    if(level !== null && categoryId !== null){
      paramsDif = new HttpParams().set('level', level).set('categoryId', categoryId);
    }
    return this.httpClient.get<LessonWithProgressResponse[]>(`${LessonService.LESSON_URL}/level`, { params: paramsDif })
  }
}
