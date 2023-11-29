import { TestBed } from '@angular/core/testing';

import { NavbarFooterService } from './navbar-footer.service';

describe('NavbarFooterService', () => {
  let service: NavbarFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
