export interface UserResponse {
    id: number;
    username: string;
    fullName: string;
    createdAt: Date;
    lastLogin: Date;
    avatarUrl: string;
    status: string;
    countryName: string;
    countryCode: string;
}

export interface UserProgressRequest{
    lessonId: number;
    status: string;
    currentSentenceIndex: number;
    totalAttempts: number;
    totalTimeSpentSeconds: number;
}

export interface UserProgressResponse{
    id: number;
    status: string;
    currentSentenceIndex: number;
    totalAttempts: number;
    totalTimeSpentSeconds: number;
}