import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTagsComponent } from './statistics-tags.component';

describe('StatisticsTagsComponent', () => {
  let component: StatisticsTagsComponent;
  let fixture: ComponentFixture<StatisticsTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
