import { NgModule } from '@angular/core';
import { TheTreesComponent } from './the-trees.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TreeEffects} from './+state/effects/tree.effects';
import * as fromTree from './+state/reducers/tree.reducer';



@NgModule({
  declarations: [TheTreesComponent],
  imports: [
    NoopAnimationsModule,
    NgxGraphModule,
    HttpClientModule,
    StoreModule.forFeature(fromTree.treeFeatureKey, fromTree.reducer),
    EffectsModule.forFeature([TreeEffects])
  ],
  exports: [TheTreesComponent]
})
export class TheTreesModule { }
