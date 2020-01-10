import { TestBed } from '@angular/core/testing';

import { DatabaseInteractionService } from './database-interaction.service';

describe('DatabaseInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseInteractionService = TestBed.get(DatabaseInteractionService);
    expect(service).toBeTruthy();
  });
});
