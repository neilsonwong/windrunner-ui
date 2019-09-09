import { TestBed } from '@angular/core/testing';

import { UserPrefService } from './user-pref.service';

describe('UserPrefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPrefService = TestBed.get(UserPrefService);
    expect(service).toBeTruthy();
  });
});
