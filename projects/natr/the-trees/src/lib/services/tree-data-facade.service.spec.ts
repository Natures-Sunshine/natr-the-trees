import { TestBed } from '@angular/core/testing';

import { TreeDataFacadeService } from './tree-data-facade.service';

describe('TreeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeDataFacadeService = TestBed.get(TreeDataFacadeService);
    expect(service).toBeTruthy();
  });
});
