import { TestBed } from '@angular/core/testing';

import { RbblibService } from './rbblib.service';

describe('RbblibService', () => {
  let service: RbblibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RbblibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
