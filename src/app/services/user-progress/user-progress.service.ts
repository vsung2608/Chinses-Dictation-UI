import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProgressRequest, UserProgressResponse } from '../../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProgressService {
  private static readonly USER_PROGRESS_URL = 'http://localhost:8080/api/v1/user/progress'

  constructor(private httpClient: HttpClient) { }

  createUserProgress(request: UserProgressRequest){
    this.httpClient.post(UserProgressService.USER_PROGRESS_URL, request)
  }

  updateUserProgress(request: UserProgressRequest, id: number){
    return this.httpClient.put(`${UserProgressService.USER_PROGRESS_URL}/${id}`, request)
  }
  
  getUserProgress(lessonId: number): Observable<UserProgressResponse>{
    return this.httpClient.get<UserProgressResponse>(`${UserProgressService.USER_PROGRESS_URL}/by-lesson/${lessonId}`)
  }

  completeLesson(id: number, timeComplete: number){
    let params = new HttpParams().set('timeCompleted', timeComplete)
    return this.httpClient.put(`${UserProgressService.USER_PROGRESS_URL}/complete/${id}`, {}, {params: params})
  }
}
