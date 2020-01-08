import {createAction, props} from '@ngrx/store';
import {TreeModel} from '../../models/tree.model';

export const loadLocalTreesActionTypeName = '[Tree] Load Local Trees';
export const loadRemoteTreesActionTypeName = '[Tree] Load Remote Trees';
export type LoadTreesActionType = '[Tree] Load Trees';

export const loadRemoteTreesAction = createAction(
  loadLocalTreesActionTypeName,
  props<{url: URL}>()
);

export const loadLocalTreesAction = createAction(
  loadRemoteTreesActionTypeName,
  props<{treeModel: TreeModel}>()
);

export const loadTreesSuccess = createAction(
  '[Tree] Load Trees Success',
  props<{ treeData: TreeModel }>()
);

export const loadTreesFailure = createAction(
  '[Tree] Load Trees Failure',
  props<{ error: any }>()
);
