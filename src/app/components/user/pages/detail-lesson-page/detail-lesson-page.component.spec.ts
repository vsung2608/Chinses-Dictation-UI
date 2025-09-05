import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLessonPageComponent } from './detail-lesson-page.component';

describe('DetailLessonPageComponent', () => {
  let component: DetailLessonPageComponent;
  let fixture: ComponentFixture<DetailLessonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailLessonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailLessonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
