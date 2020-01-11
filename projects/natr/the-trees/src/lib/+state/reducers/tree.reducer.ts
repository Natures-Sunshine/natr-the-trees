import {Action, createReducer, on} from '@ngrx/store';
import * as TreeActions from '../actions/tree.actions';
import {TreeModel} from '../../models/tree.model';

export const treeFeatureKey = 'tree';

export interface TreeState {
  treeData: TreeModel;
}

export const initialState: TreeState = null;

export const treeReducer = createReducer(
  initialState,

  on(TreeActions.loadLocalTreesAction, (state, props) => ({...state})),
  on(TreeActions.loadRemoteTreesAction, state => state),
  // on(TreeActions.loadTreesSuccess, (state, action: { type: string, data: TreeState }) => ({...state, treeData: action.data.treeData})),
  on(TreeActions.loadTreesSuccess,
    (state, props) => {
      console.log('in treeReducer state', state);
      console.log('in treeReducer props', props);
      return {...state, treeData: props.treeData};
    }
  ),
  on(TreeActions.loadTreesFailure, (state, action) => state),
);

export function reducer(state: TreeState | undefined, action: Action) {
  return treeReducer(state, action);
}
