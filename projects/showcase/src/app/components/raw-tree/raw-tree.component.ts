import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {TreeState} from '../../../../../natr/the-trees/src/lib/+state/reducers/tree.reducer';
import {loadLocalTreesAction} from '../../../../../natr/the-trees/src/lib/+state/actions/tree.actions';

@Component({
  selector: 'app-raw-tree',
  templateUrl: './raw-tree.component.html',
  styleUrls: ['./raw-tree.component.scss']
})
export class RawTreeComponent implements OnInit {
  treeState = {
    treeData: {
      nodes: [
        {
          id: 'first',
          label: 'A'
        },
        {
          id: 'second',
          label: 'B'
        },
        {
          id: 'third',
          label: 'C'
        },
      ],
      edges: [
        {
          id: 'a',
          source: 'first',
          target: 'second',
          label: 'is parent of'
        },
        {
          id: 'b',
          source: 'first',
          target: 'third',
          label: 'custom label'
        }
      ]
    }
  } as TreeState;

  constructor(private store: Store<{ tree: TreeState }>) {
  }

  ngOnInit() {
  }

  changeTree() {
    console.log('tree changed');
    this.store.dispatch(loadLocalTreesAction({treeData: this.treeState.treeData}));
  }
}
