import {createAction, props} from '@ngrx/store';
import {TreeModel} from '../../models/tree.model';

export const loadLocalTreesActionTypeName = '[Tree] Load Local Trees';
export const loadRemoteTreesActionTypeName = '[Tree] Load Remote Trees';
export const loadTreesSuccessActionTypeName = '[Tree] Load Trees Success';
export const loadTreesFailureActionTypeName = '[Tree] Load Trees Failure';
export const treeZoomActionTypeName = '[Tree] Zoom';
export const treeClickActionTypeName = '[Tree] Zoom';

export const loadRemoteTreesAction = createAction(
  loadLocalTreesActionTypeName,
  props<{url: URL}>()
);

export const loadLocalTreesAction = createAction(
  loadRemoteTreesActionTypeName,
  props<{treeData: TreeModel}>()
);

export const loadTreesSuccess = createAction(
  loadTreesSuccessActionTypeName,
  props<{ treeData: TreeModel }>()
);

export const loadTreesFailure = createAction(
  loadTreesFailureActionTypeName,
  props<{ error: any }>()
);

export const treeZoom = createAction(
  treeZoomActionTypeName,
  props<{zoom: number}>()
);

export const treeClick = createAction(
  treeClickActionTypeName,
  props<{clickEvent: MouseEvent}>()
);
