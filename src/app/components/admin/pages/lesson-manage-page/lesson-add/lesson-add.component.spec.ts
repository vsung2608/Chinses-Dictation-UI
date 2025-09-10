import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonAddComponent } from './lesson-add.component';

describe('LessonAddComponent', () => {
  let component: LessonAddComponent;
  let fixture: ComponentFixture<LessonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
