import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordUpdatedSuccessfullyComponent } from './password-updated-successfully.component';

describe('PasswordUpdatedSuccessfullyComponent', () => {
  let component: PasswordUpdatedSuccessfullyComponent;
  let fixture: ComponentFixture<PasswordUpdatedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordUpdatedSuccessfullyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordUpdatedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
