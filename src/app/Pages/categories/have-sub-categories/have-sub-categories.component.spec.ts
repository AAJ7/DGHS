import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveSubCategoriesComponent } from './have-sub-categories.component';

describe('HaveSubCategoriesComponent', () => {
  let component: HaveSubCategoriesComponent;
  let fixture: ComponentFixture<HaveSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaveSubCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaveSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
