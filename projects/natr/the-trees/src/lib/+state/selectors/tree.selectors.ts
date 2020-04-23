import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTree from '../reducers/tree.reducer';
import {TreeState} from '../reducers/tree.reducer';

export const selectTreeState = createFeatureSelector<fromTree.TreeState>(
  fromTree.treeFeatureKey
);

export const selectTreeData = createSelector(
  selectTreeState,
  (state: TreeState) => state && state.treeData
);

export const selectZoomData = createSelector(
  selectTreeState,
  (state: TreeState) => state && state.zoom
);

export const selectTreeClick = createSelector(
  selectTreeState,
  (state: TreeState) => state && state.clickEvent
);
