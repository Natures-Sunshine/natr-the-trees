import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {TreeState} from '../../../../../natr/the-trees/src/lib/+state/reducers/tree.reducer';
import {loadLocalTreesAction, loadRemoteTreesAction} from '../../../../../natr/the-trees/src/lib/+state/actions/tree.actions';

@Component({
  selector: 'app-my-tree',
  templateUrl: './my-tree.component.html',
  styleUrls: ['./my-tree.component.scss']
})
export class MyTreeComponent implements OnInit {
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
        },
        {
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
  } as TreeState;

  constructor(private store: Store<{ tree: TreeState }>) {
  }

  ngOnInit() {
  }

  nodeClicked(node) {
    console.log(node);
  }

  changeTreeFromLocal() {
    console.log('tree changed from local');
    this.store.dispatch(loadLocalTreesAction({treeModel: this.treeState.treeData}));
  }

  changeTreeFromRemote() {
    console.log('tree changed from remote');
    this.store.dispatch(loadRemoteTreesAction({url: new URL('http://localhost:4200/assets/tree.json')}));
  }
}
