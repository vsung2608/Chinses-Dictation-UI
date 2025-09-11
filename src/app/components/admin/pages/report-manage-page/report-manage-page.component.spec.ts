import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportManagePageComponent } from './report-manage-page.component';

describe('ReportManagePageComponent', () => {
  let component: ReportManagePageComponent;
  let fixture: ComponentFixture<ReportManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportManagePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
