import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentManagePageComponent } from './comment-manage-page.component';

describe('CommentManagePageComponent', () => {
  let component: CommentManagePageComponent;
  let fixture: ComponentFixture<CommentManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentManagePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
