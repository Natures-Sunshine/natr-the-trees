import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as TreeActions from '../actions/tree.actions';
import {HttpClient} from '@angular/common/http';
import {TreeModel} from '../../models/tree.model';


@Injectable()
export class TreeEffects {

  loadRemoteTrees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TreeActions.loadRemoteTreesAction),
      concatMap((action, num) => {
          console.log(`${TreeEffects.name}.loadRemoteTrees action`, action);
          console.log(`${TreeEffects.name}.loadRemoteTrees num`, num);
          return this.httpClient.get(action.url.toString())
            .pipe(
              map((data: TreeModel) => {
                  console.log(`${TreeEffects.name}.loadRemoteTrees pipe from http call data`, data);
                  return TreeActions.loadTreesSuccess({treeData: data});
                }
              ),
              catchError(error => of(TreeActions.loadTreesFailure({error})))
            );
        }
      )
    );
  });

  loadLocalTrees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TreeActions.loadLocalTreesAction),
      concatMap((actionProps, num) => {
          console.log(`${TreeEffects.name}.loadLocalTrees action`, actionProps);
          console.log(`${TreeEffects.name}.loadLocalTrees num`, num);
          return of(actionProps.treeData)
            .pipe(
              map(data => {
                  console.log(`${TreeEffects.name}.loadRemoteTrees pipe from 'of' data`, data);
                  return TreeActions.loadTreesSuccess({treeData: data});
                }
              ),
              catchError(error => of(TreeActions.loadTreesFailure({error})))
            )
            ;
        }
      )
    );
  });

  constructor(private httpClient: HttpClient, private actions$: Actions) {
  }

}
