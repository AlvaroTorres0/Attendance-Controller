import { TestBed } from '@angular/core/testing';

import { MscvServiceService } from './mscv-service.service';

describe('MscvServiceService', () => {
  let service: MscvServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MscvServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
