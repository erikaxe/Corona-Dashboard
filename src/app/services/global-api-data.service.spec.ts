import { TestBed } from '@angular/core/testing';

import { GlobalApiDataService } from './global-api-data.service';

describe('GlobalApiDataService', () => {
  let service: GlobalApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
