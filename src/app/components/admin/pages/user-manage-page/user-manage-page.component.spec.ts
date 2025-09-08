import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagePageComponent } from './user-manage-page.component';

describe('UserManagePageComponent', () => {
  let component: UserManagePageComponent;
  let fixture: ComponentFixture<UserManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
