import { TestBed } from '@angular/core/testing';

import { AvoidCoronaService } from './avoid-corona.service';

describe('AvoidCoronaService', () => {
  let service: AvoidCoronaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvoidCoronaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
