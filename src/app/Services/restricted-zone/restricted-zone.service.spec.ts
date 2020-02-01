import {TestBed} from '@angular/core/testing';

import {RestrictedZoneService} from './restricted-zone.service';

describe('RestricedZoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestrictedZoneService = TestBed.get(RestrictedZoneService);
    expect(service).toBeTruthy();
  });
});
