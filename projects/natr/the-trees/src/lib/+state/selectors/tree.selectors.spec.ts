import * as fromTree from '../reducers/tree.reducer';
import { selectTreeState } from './tree.selectors';

describe('Tree Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTreeState({
      [fromTree.treeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
