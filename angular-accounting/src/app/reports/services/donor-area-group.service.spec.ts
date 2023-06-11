import { TestBed } from '@angular/core/testing';

import { DonorAreaGroupService } from './donor-area-group.service';

describe('DonorAreaGroupService', () => {
  let service: DonorAreaGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorAreaGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
