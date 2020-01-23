import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {GraphComponent} from '@swimlane/ngx-graph';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {TreeState} from './+state/reducers/tree.reducer';
import {TreeNodeModel} from './models/tree-node.model';
import {TreeEdgeModel} from './models/tree-edge.model';

@Component({
  selector: 'lib-the-trees',
  templateUrl: 'the-trees.component.html',
  styleUrls: ['the-trees.component.scss']
})
export class TheTreesComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, OnChanges {
  @ContentChild('linkTemplate', {static: false}) linkTemplate: TemplateRef<any>;
  @ContentChild('nodeTemplate', {static: false}) nodeTemplate: TemplateRef<any>;
  @ContentChild('clusterTemplate', {static: false}) clusterTemplate: TemplateRef<any>;
  @ContentChild('defsTemplate', {static: false}) defsTemplate: TemplateRef<any>;

  @ViewChild('graphComponent', {static: false}) graphComponent: GraphComponent;
  @ViewChildren(GraphComponent) graphChildren: QueryList<GraphComponent>;

  links: TreeEdgeModel[];
  nodes: TreeNodeModel[];
  gotDate = false;

  zoomToFit$: Subject<boolean> = new Subject();
  viewSize: number[] = [600, 500];
  layoutSettings = {
    orientation: 'TB'
  };


  constructor(private store: Store<{ tree: TreeState }>) {
    this.zoomToFit$.next(true);

    this.store.select(state => state && state.tree)
      .subscribe(
        tree => {
          console.log('in tree-diagram tree is ', tree);
          if (tree && tree.treeData) {
            this.nodes = tree.treeData.nodes;
            this.links = tree.treeData.edges;
            this.gotDate = true;
          }
        }
      );

  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    console.log('graphComp in after view', this.graphComponent);
    this.graphChildren.changes.subscribe((thing) => {
      console.log('children change thing is ', thing);

      if (this.graphComponent) {
        if (this.nodeTemplate) {
          this.graphComponent.nodeTemplate = this.nodeTemplate;
        }
        if (this.linkTemplate) {
          this.graphComponent.linkTemplate = this.linkTemplate;
        }
        if (this.clusterTemplate) {
          this.graphComponent.clusterTemplate = this.clusterTemplate;
        }
        if (this.defsTemplate) {
          this.graphComponent.defsTemplate = this.defsTemplate;
        }
      }
    });
  }

  changeLayout(): void {
    if (this.layoutSettings.orientation === 'TB') {
      this.layoutSettings = {...this.layoutSettings, orientation: 'BT'};
    } else {
      this.layoutSettings = {...this.layoutSettings, orientation: 'TB'};
    }

    console.log(this.layoutSettings);
  }

  ngAfterViewChecked(): void {

  }

  ngAfterContentChecked(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes', changes);
  }
}
