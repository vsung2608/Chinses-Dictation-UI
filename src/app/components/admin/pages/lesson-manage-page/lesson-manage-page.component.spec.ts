import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonManagePageComponent } from './lesson-manage-page.component';

describe('LessonManagePageComponent', () => {
  let component: LessonManagePageComponent;
  let fixture: ComponentFixture<LessonManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonManagePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
