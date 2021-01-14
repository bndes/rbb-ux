import { TestBed } from '@angular/core/testing';

import { RbbuxService } from './rbbux.service';

describe('RbbuxService', () => {
  let service: RbbuxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RbbuxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
