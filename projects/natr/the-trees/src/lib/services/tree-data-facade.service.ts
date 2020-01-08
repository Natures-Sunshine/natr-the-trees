import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {concatMap, delay} from 'rxjs/operators';
import {Edge, Node} from '@swimlane/ngx-graph';
import {TreeModel} from '../models/tree.model';
import {TypedAction} from '@ngrx/store/src/models';
import {LoadTreesActionType} from '../+state/actions/tree.actions';

@Injectable({
  providedIn: 'root'
})
export class TreeDataFacadeService {

  constructor() {
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

  dispatchRemoteLoadTree(action: TypedAction<LoadTreesActionType>, remoteUrl: URL): Observable<void> {
    return EMPTY;
  }

}
