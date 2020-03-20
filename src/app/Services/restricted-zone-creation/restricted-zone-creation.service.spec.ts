import { TestBed } from '@angular/core/testing';

import { RestrictedZoneCreationService } from './restricted-zone-creation.service';

describe('RestrictedZoneCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestrictedZoneCreationService = TestBed.get(RestrictedZoneCreationService);
    expect(service).toBeTruthy();
  });
});
