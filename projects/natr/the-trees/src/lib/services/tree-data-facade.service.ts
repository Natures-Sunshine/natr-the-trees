import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {concatMap, delay} from 'rxjs/operators';
import {Edge, Node} from '@swimlane/ngx-graph';
import {TreeModel} from '../models/tree.model';
import {TypedAction} from '@ngrx/store/src/models';
import {
  loadLocalTreesAction,
  LoadLocalTreesActionType,
  loadRemoteTreesAction,
  LoadRemoteTreesActionType
} from '../+state/actions/tree.actions';
import {Store} from '@ngrx/store';
import {TreeState} from '../+state/reducers/tree.reducer';

@Injectable({
  providedIn: 'root'
})
export class TreeDataFacadeService {

  constructor(private store: Store<TreeState>) {
  }

  nodes(): Observable<Node[]> {
    return of(
      [
        {
          id: 'first',
          label: 'A'
        }, {
        id: 'second',
        label: 'B'
      }, {
        id: 'third',
        label: 'C'
      },
        {
          id: 'forth',
          label: 'D'
        }
      ]
    );
  }

  edges(): Observable<Edge[]> {
    return of(
      [
        {
          id: 'a',
          source: 'first',
          target: 'second',
          label: 'is parent of'
        }, {
        id: 'b',
        source: 'second',
        target: 'third',
        label: 'custom label'
      },
        {
          id: 'c',
          source: 'first',
          target: 'forth',
          label: 'custom label'
        }
      ]
    );
  }

  root(): Observable<TreeModel> {
    return of(
      {
        nodes: [
          {
            id: 'first',
            label: 'A'
          }, {
            id: 'second',
            label: 'B'
          }, {
            id: 'third',
            label: 'C'
          },
          {
            id: 'forth',
            label: 'D'
          }
        ],
        edges: [
          {
            id: 'a',
            source: 'first',
            target: 'second',
            label: 'is parent of'
          }, {
            id: 'b',
            source: 'second',
            target: 'third',
            label: 'custom label'
          },
          {
            id: 'c',
            source: 'first',
            target: 'forth',
            label: 'custom label'
          }
        ]
      }
    )
      .pipe(
        concatMap(item => of(item).pipe(delay(10000)))
      );
  }

  dispatchRemoteLoadTree(url: URL): void {
    this.store.dispatch(loadRemoteTreesAction({url}));
  }

  dispatchLocalLoadTree(treeModel: TreeModel): void {
    this.store.dispatch(loadLocalTreesAction({treeData: treeModel}));
  }

}
