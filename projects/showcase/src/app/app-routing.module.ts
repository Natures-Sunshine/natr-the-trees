import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyTreeComponent} from './components/my-tree/my-tree.component';
import {RawTreeComponent} from './components/raw-tree/raw-tree.component';


const routes: Routes = [
  {
    path: '',
    component: MyTreeComponent
  },
  {
    path: 'standard',
    component: RawTreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
