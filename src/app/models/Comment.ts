export interface CommentRequest{
  productId: number
  userId: string
  userName: string
  userAvatarUrl: string
  content: string
  parentCommentId: string
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