import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMapsComponent } from './home-maps.component';

describe('HomeMapsComponent', () => {
  let component: HomeMapsComponent;
  let fixture: ComponentFixture<HomeMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
