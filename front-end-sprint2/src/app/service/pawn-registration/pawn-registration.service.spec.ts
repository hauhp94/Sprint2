import { TestBed } from '@angular/core/testing';

import { PawnRegistrationService } from './pawn-registration.service';

describe('PawnRegistrationService', () => {
  let service: PawnRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PawnRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
