import { TestBed } from '@angular/core/testing';

import { ThumbnailService } from './thumbnail.service';

describe('ThumbnailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThumbnailService = TestBed.get(ThumbnailService);
    expect(service).toBeTruthy();
  });
});
