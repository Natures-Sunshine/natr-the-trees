import {Action, createReducer, on} from '@ngrx/store';
import * as TreeActions from '../actions/tree.actions';
import {TreeModel} from '../../models/tree.model';
import * as lodash from 'lodash';

export const treeFeatureKey = 'tree';

export interface TreeState {
  treeData: TreeModel;
}

export const initialState: TreeState = null;

export const treeReducer = createReducer(
  initialState,

  on(TreeActions.loadLocalTreesAction, state => lodash.cloneDeep(state)),
  on(TreeActions.loadRemoteTreesAction, state => lodash.cloneDeep(state)),
  on(TreeActions.loadTreesSuccess,
    (state, props) => {
      return {...lodash.cloneDeep(state), treeData: lodash.cloneDeep(props.treeData)};
    }
  ),
  on(TreeActions.loadTreesFailure, (state, action) => state),
);

export function reducer(state: TreeState | undefined, action: Action) {
  return treeReducer(state, action);
}
