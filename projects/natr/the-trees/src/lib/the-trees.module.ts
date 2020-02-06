import {InjectionToken, NgModule} from '@angular/core';
import {TheTreesComponent} from './the-trees.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {HttpClientModule} from '@angular/common/http';
import {ActionReducer, ActionReducerMap, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TreeEffects} from './+state/effects/tree.effects';
import * as fromTree from './+state/reducers/tree.reducer';
import {reducer, treeReducer} from './+state/reducers/tree.reducer';
import {CommonModule} from '@angular/common';

export const TREE_FEATURE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<fromTree.TreeState>>('Feature Reducers');

export function getReducer(): ActionReducer<any, any> {
  // map of reducers
  return reducer;
}

export const TREE_ACTION_REDUCER_TOKEN = new InjectionToken<ActionReducer<fromTree.TreeState>>('tree reducer');

export function getTreeReducer(): ActionReducer<any, any> {
  // map of reducers
  return treeReducer;
}

@NgModule({
  declarations: [TheTreesComponent],
  imports: [
    CommonModule,
    NgxGraphModule,
    HttpClientModule,
    StoreModule.forFeature(fromTree.treeFeatureKey, TREE_FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([TreeEffects])
  ],
  exports: [TheTreesComponent],
  providers: [
    {
      provide: TREE_FEATURE_REDUCER_TOKEN,
      useFactory: getReducer
    },
    {
      provide: TREE_ACTION_REDUCER_TOKEN,
      useFactory: getTreeReducer
    }
  ]
})
export class TheTreesModule { }
