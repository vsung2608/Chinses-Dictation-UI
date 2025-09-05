import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/Lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private static readonly LESSON_URL = 'http://localhost:8080/api/v1/user/lessons'
  constructor(private httpClient: HttpClient) { }

  getDetailLessonById(id: number): Observable<Lesson> {
    return this.httpClient.get<Lesson>(`${LessonService.LESSON_URL}/${id}`);
  }
}
