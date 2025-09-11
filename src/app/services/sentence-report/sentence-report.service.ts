import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SentenceReportRequest, SentenceReportResponse } from '../../models/SentenceReport';
import { DataPaged } from '../../models/Data';

@Injectable({
  providedIn: 'root'
})
export class SentenceReportService {

  private readonly USER_REPORT_URL = 'http://localhost:8080/api/v1/user/report';
  private readonly ADMIN_REPORT_URL = 'http://localhost:8080/api/v1/admin/reports';

  params: HttpParams = new HttpParams().set('page', '1').set('size', '10');

  constructor(private httpClient: HttpClient) { }

  reportSentence(title: string, reason: string, sentenceId: number | undefined) {
    let request: SentenceReportRequest = {title: title, reason: reason, sentenceId: sentenceId};
    return this.httpClient.post(this.USER_REPORT_URL, request);
  }

  loadReportPaged(page: number, size: number){
    if(page !== null && size !== null){
      this.params = new HttpParams().set('page', page).set('size', size)
    }
    return this.httpClient.get<DataPaged<SentenceReportResponse>>(this.ADMIN_REPORT_URL, {params: this.params})
  }
}
