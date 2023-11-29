import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAndFooterContentComponent } from './navbar-and-footer-content.component';

describe('NavbarAndFooterContentComponent', () => {
  let component: NavbarAndFooterContentComponent;
  let fixture: ComponentFixture<NavbarAndFooterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAndFooterContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAndFooterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
