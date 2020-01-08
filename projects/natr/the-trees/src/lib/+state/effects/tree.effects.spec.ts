import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TreeEffects } from './tree.effects';

describe('TreeEffects', () => {
  let actions$: Observable<any>;
  let effects: TreeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TreeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<TreeEffects>(TreeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
