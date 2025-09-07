import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SentenceReportRequest } from '../../models/SentenceReport';

@Injectable({
  providedIn: 'root'
})
export class SentenceReportService {

  private readonly reportUrl = 'http://localhost:8080/api/v1/user/report';

  constructor(private httpClient: HttpClient) { }

  reportSentence(title: string, reason: string, sentenceId: number) {
    let request: SentenceReportRequest = {title: title, reason: reason, sentenceId: sentenceId};
    return this.httpClient.post(this.reportUrl, request);
  }
}
