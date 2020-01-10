import { TestBed } from '@angular/core/testing';

import { RestricedZoneService } from './restriced-zone.service';

describe('RestricedZoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestricedZoneService = TestBed.get(RestricedZoneService);
    expect(service).toBeTruthy();
  });
});
