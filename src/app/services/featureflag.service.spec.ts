import { TestBed } from '@angular/core/testing';

import { FeatureflagService } from './featureflag.service';

describe('FeatureflagService', () => {
  let service: FeatureflagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureflagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
