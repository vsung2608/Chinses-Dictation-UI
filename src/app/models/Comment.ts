export interface CommentRequest{
  lessonId: number;
  content: string;
  parentCommentId: number | null;
}

export interface CommentResponse{
  id: number,
  productId: number,
  userId: string,
  content: string,
  userName: string,
  userAvatarUrl: string,
  replyCount: number,
  parentCommentId: number,
  createdAt: string
  replies: CommentResponse[]
}