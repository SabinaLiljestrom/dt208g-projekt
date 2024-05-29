import { TestBed } from '@angular/core/testing';

import { FramescheduleService } from './frameschedule.service';

describe('FramescheduleService', () => {
  let service: FramescheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FramescheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
