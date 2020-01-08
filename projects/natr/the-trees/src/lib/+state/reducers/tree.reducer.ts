import {Action, createReducer, on} from '@ngrx/store';
import * as TreeActions from '../actions/tree.actions';
import {TreeModel} from '../../models/tree.model';

export const treeFeatureKey = 'tree';

export interface TreeState {
  treeData: TreeModel;
}

export const initialState: TreeState = {
  treeData: null
};

const treeReducer = createReducer(
  null,

  on(TreeActions.loadLocalTreesAction, (state, props) => ({...state, treeData: props})),
  on(TreeActions.loadRemoteTreesAction, state => state),
  // on(TreeActions.loadTreesSuccess, (state, action: { type: string, data: TreeState }) => ({...state, treeData: action.data.treeData})),
  on(TreeActions.loadTreesSuccess,
    (state, action: { type: string, treeData: TreeState }) => {
      console.log('in treeReducer state', state);
      console.log('in treeReducer action', action);
      return {...state, treeData: action.treeData};
    }
  ),
  on(TreeActions.loadTreesFailure, (state, action) => state),
);

export function reducer(state: TreeState | undefined, action: Action) {
  return treeReducer(state, action);
}
