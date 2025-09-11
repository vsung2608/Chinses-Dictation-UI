import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CommentRequest, CommentResponse } from '../../models/Comment';
import { DataPaged } from '../../models/Data';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private static readonly COMMENT_URL = 'http://localhost:8080/api/v1/user/comments'
  private static readonly ADMIN_COMMENT_URL = 'http://localhost:8080/api/v1/admin/comments'
  private data: DataPaged<CommentResponse> | undefined;

  private commentsSubject = new BehaviorSubject<CommentResponse[]>([]);
  comments$ = this.commentsSubject.asObservable();

  params: HttpParams = new HttpParams().set('page', '1').set('size', '10');

  constructor(private httpClient: HttpClient) { }

  postComment(formData: FormData) {
    this.httpClient.post<CommentResponse>(CommentService.COMMENT_URL, formData)
      .subscribe(comment => {
        if (comment.parentCommentId === null) {
          const currentComments = this.commentsSubject.getValue()
          const updatedComment = [comment, ...currentComments]
          this.commentsSubject.next(updatedComment)
        } else {

        }
      });
  }

  deleteComment(id: number) {
    this.httpClient.delete(CommentService.COMMENT_URL)
      .subscribe(() => {

      })
  }

  loadComments(lessonId: number, page: number, size: number) {
    if (page != null && size != null && lessonId != null) {
      this.params = this.params.set('page', page).set('size', size).set('lessonId', lessonId);
    }
    this.httpClient.get<DataPaged<CommentResponse>>(`${CommentService.COMMENT_URL}/by-lesson`, { params: this.params })
      .subscribe(dataResponse => {
        this.data = dataResponse;
        this.commentsSubject.next(dataResponse.data);
      });
  }

  loadChildComments(parentCommentId: number) {
    this.httpClient.get<DataPaged<CommentResponse>>(`${CommentService.COMMENT_URL}/replies?parentCommentId=${parentCommentId}`)
      .subscribe(childComments => {
          const currentComments = this.commentsSubject.getValue();
          const updatedComments = this.updateCommentsWithReplies(currentComments, parentCommentId, childComments.data);
          this.commentsSubject.next(updatedComments);
        })
      ;
  }

  private updateCommentsWithReplies(
    comments: CommentResponse[],
    parentCommentId: number,
    replies: CommentResponse[]
  ): CommentResponse[] {
    return comments.map(comment => {
      if (comment.id === parentCommentId) {
        // Tìm thấy comment cha, cập nhật replies
        return {
          ...comment,
          replies: replies
        };
      } else if (comment.replies && comment.replyCount > 0) {
        // Đệ quy tìm trong các replies
        return {
          ...comment,
          replies: this.updateCommentsWithReplies(comment.replies, parentCommentId, replies)
        };
      }
      return comment;
    });
  }

  loadCommentOrderByDate(page: number, size: number){
    if(page !== null && size !== null){
      this.params = new HttpParams().set('page', page).set('size', size);
    }
    return this.httpClient.get<DataPaged<CommentResponse>>(CommentService.ADMIN_COMMENT_URL, {params: this.params});
  }
}
