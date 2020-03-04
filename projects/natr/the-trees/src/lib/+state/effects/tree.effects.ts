import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as TreeActions from '../actions/tree.actions';
import {HttpClient} from '@angular/common/http';
import {TreeModel} from '../../models/tree.model';
import {HistorianService, Logging} from '@natr/historian';


@Logging
@Injectable()
export class TreeEffects {
  private logger: HistorianService;

  loadRemoteTrees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TreeActions.loadRemoteTreesAction),
      concatMap((action, num) => {
          this.logger.debug(`${TreeEffects.name}.loadRemoteTrees action`, action);
          this.logger.debug(`${TreeEffects.name}.loadRemoteTrees num`, num);
          return this.httpClient.get(action.url.toString())
            .pipe(
              map((data: TreeModel) => {
                  this.logger.debug(`${TreeEffects.name}.loadRemoteTrees pipe from http call data`, data);
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
          this.logger.debug(`${TreeEffects.name}.loadLocalTrees action`, actionProps);
          this.logger.debug(`${TreeEffects.name}.loadLocalTrees num`, num);
          return of(actionProps.treeData)
            .pipe(
              map(data => {
                  this.logger.debug(`${TreeEffects.name}.loadRemoteTrees pipe from 'of' data`, data);
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
