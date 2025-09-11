export interface SentenceReportRequest {
    title: string;
    reason: string;
    sentenceId: number | undefined;
}

export interface SentenceReportResponse {
    id: number;
    reason: string;
    status: string;
    userName: string;
    userAvatar: string;
    sentenceId: string;
    createdAt: Date;
    updatedAt: Date;
    handledAt: Date;
}