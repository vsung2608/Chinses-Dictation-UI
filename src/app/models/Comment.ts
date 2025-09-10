export interface CommentRequest{
  lessonId: number;
  content: string;
  parentCommentId: number;
}

export interface CommentResponse{
  id: string,
  productId: number,
  userId: string,
  content: string,
  userName: string,
  userAvatarUrl: string,
  replyCount: number,
  parentCommentId: string,
  createdAt: string
}