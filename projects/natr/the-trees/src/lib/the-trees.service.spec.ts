import { TestBed } from '@angular/core/testing';

import { TheTreesService } from './the-trees.service';

describe('TheTreesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheTreesService = TestBed.get(TheTreesService);
    expect(service).toBeTruthy();
  });
});
