import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTree from '../reducers/tree.reducer';

export const selectTreeState = createFeatureSelector<fromTree.TreeState>(
  fromTree.treeFeatureKey
);
