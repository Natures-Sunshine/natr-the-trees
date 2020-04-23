import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {concatMap, delay} from 'rxjs/operators';
import {Edge} from '@swimlane/ngx-graph';
import {TreeModel} from '../models/tree.model';
import {loadLocalTreesAction, loadRemoteTreesAction} from '../+state/actions/tree.actions';
import {select, Store} from '@ngrx/store';
import {TreeState} from '../+state/reducers/tree.reducer';
import {TreeNodeModel} from '../models/tree-node.model';
import {selectTreeClick, selectZoomData} from '../+state/selectors/tree.selectors';

@Injectable({
  providedIn: 'root'
})
export class TreeDataFacadeService {

  constructor(private store: Store<TreeState>) {
  }

  dispatchRemoteLoadTree(url: URL): void {
    this.store.dispatch(loadRemoteTreesAction({url}));
  }

  dispatchLocalLoadTree(treeModel: TreeModel): void {
    this.store.dispatch(loadLocalTreesAction({treeData: treeModel}));
  }

  zoomLevel(): Observable<number> {
    return this.store.select(selectZoomData);
  }

  treeClick(): Observable<MouseEvent> {
    return this.store.select(selectTreeClick);
  }
}
