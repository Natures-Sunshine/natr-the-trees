import {Component, OnInit} from '@angular/core';
import {TreeState} from '../../../../../natr/the-trees/src/lib/+state/reducers/tree.reducer';
import {TreeDataFacadeService} from '../../../../../natr/the-trees/src/lib/services/tree-data-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {TreeAttributesModel} from '../../../../../natr/the-trees/src/lib/models/tree-attributes.model';

@Logging
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

  treeAttributes = {draggingEnabled: false, enableZoom: true} as TreeAttributesModel;

  logger: HistorianService;

  constructor(private treeDataFacade: TreeDataFacadeService) {
    this.logger.debug('my tree');
  }

  ngOnInit() {
    this.treeDataFacade.zoomLevel()
      .subscribe(zoom => {
        this.logger.debug('zoom is ', zoom);
      });

    this.treeDataFacade.treeClick()
      .subscribe(click => {
        this.logger.debug('click is ', click);
      });
  }

  nodeClicked(node) {
    this.logger.debug('node is', node);
  }

  changeTreeFromLocal() {
    this.logger.debug('tree changed from local');
    this.treeDataFacade.dispatchLocalLoadTree(this.treeState.treeData);
  }

  changeTreeFromRemote() {
    this.logger.debug('tree changed from remote');
    this.treeDataFacade.dispatchRemoteLoadTree(new URL('http://localhost:4200/assets/tree.json'));
  }
}
