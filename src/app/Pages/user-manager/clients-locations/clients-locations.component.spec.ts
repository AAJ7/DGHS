import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsLocationsComponent } from './clients-locations.component';

describe('ClientsLocationsComponent', () => {
  let component: ClientsLocationsComponent;
  let fixture: ComponentFixture<ClientsLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
