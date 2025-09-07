import { TestBed } from '@angular/core/testing';

import { SentenceReportService } from './sentence-report.service';

describe('SentenceReportService', () => {
  let service: SentenceReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentenceReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
