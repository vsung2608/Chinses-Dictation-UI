import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentRequest, CommentResponse } from '../../models/Comment';
import { DataPaged } from '../../models/Data';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private static readonly COMMENT_URL = 'http://localhost:8080/api/v1/user/comments/by-lesson'
  private data: DataPaged<CommentResponse> | undefined;

  private commentsSubject = new BehaviorSubject<CommentResponse[]>([]);
  comments$ = this.commentsSubject.asObservable();

  private repliesSubject = new BehaviorSubject<CommentResponse[]>([]);
  replies$ = this.repliesSubject.asObservable();

  params: HttpParams = new HttpParams().set('page', '1').set('size', '10');

  constructor(private httpClient: HttpClient) { }

  postComment(productId: number, content: string, parentCommentId: string) {
    let comment: CommentRequest = {
      productId: productId, userId: '1', userName: 'Nguyen Van Sung', userAvatarUrl: 'https://untitledui.com/images/avatars/transparent/byron-robertson', content: content, parentCommentId: parentCommentId
    }
    this.httpClient.post<CommentResponse>(CommentService.COMMENT_URL, comment)
      .subscribe(comment => {
        if (comment.parentCommentId === null || comment.parentCommentId === '') {
          const currentComments = this.commentsSubject.getValue()
          const updatedComment = [comment, ...currentComments]
          this.commentsSubject.next(updatedComment)
        } else {
          const currentReply = this.repliesSubject.getValue()
          const updatedReply = [comment, ...currentReply]
          this.repliesSubject.next(updatedReply)
        }
      });
  }

  deleteComment(id: number) {
    this.httpClient.delete(CommentService.COMMENT_URL)
      .subscribe(() => {

      })
  }

  loadComments(lessonId: number, page: number, size: number)  {
    if(page != null && size != null && lessonId != null){
      this.params = this.params.set('page', page).set('size', size).set('lessonId', lessonId);
    }
    this.httpClient.get<DataPaged<CommentResponse>>(CommentService.COMMENT_URL, { params: this.params })
      .subscribe(dataResponse => {
        this.data = dataResponse;
        this.commentsSubject.next(dataResponse.data);
      });
  }

  loadReplyComments(parrentCommentId: string) {
    this.httpClient.get<CommentResponse[]>(`${CommentService.COMMENT_URL}/reply/${parrentCommentId}`)
      .subscribe(comments => {
        this.repliesSubject.next(comments);
      });
  }
}
