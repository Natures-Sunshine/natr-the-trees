import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MyTreeComponent} from './components/my-tree/my-tree.component';
import {RawTreeComponent} from './components/raw-tree/raw-tree.component';
import {TheTreesModule} from '../../../natr/the-trees/src/lib/the-trees.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MyTreeComponent,
    RawTreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    TheTreesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
