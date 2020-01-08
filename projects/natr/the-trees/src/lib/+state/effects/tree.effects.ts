import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, delay, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as TreeActions from '../actions/tree.actions';
import {TreeState} from '../reducers/tree.reducer';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class TreeEffects {

  loadRemoteTrees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TreeActions.loadRemoteTreesAction),
      concatMap((action, num) => {
          console.log('in effect, action', action);
          console.log('in effect thing', num);
          return this.httpClient.get(action.url.toString())
            .pipe(
              map(data => {
                  console.log('in tree effect data is ', data);
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
          console.log('in effect, actionProps', actionProps);
          console.log('in effect thing', num);
          return of(actionProps.treeModel)
            .pipe(
              map(data => {
                  console.log('in tree effects data is ', data);
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
