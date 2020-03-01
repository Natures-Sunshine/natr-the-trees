import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {GraphComponent} from '@swimlane/ngx-graph';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {TreeState} from './+state/reducers/tree.reducer';
import {TreeNodeModel} from './models/tree-node.model';
import {TreeEdgeModel} from './models/tree-edge.model';
import {TreeModel} from './models/tree.model';

@Component({
  selector: 'lib-the-trees',
  templateUrl: 'the-trees.component.html',
  styleUrls: ['the-trees.component.scss']
})
export class TheTreesComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, OnChanges {
  @ContentChild('linkTemplate') linkTemplate: TemplateRef<any>;
  @ContentChild('nodeTemplate') nodeTemplate: TemplateRef<any>;
  @ContentChild('clusterTemplate') clusterTemplate: TemplateRef<any>;
  @ContentChild('defsTemplate') defsTemplate: TemplateRef<any>;

  @ViewChild('graphComponent') graphComponent: GraphComponent;
  @ViewChildren(GraphComponent) graphChildren: QueryList<GraphComponent>;

  @Input() tree: TreeModel;
  @Input() viewDimensions: number[] = [400, 800];
  @Input() zoomToFit$: Subject<boolean> = new Subject<boolean>();
  @Input() layoutSettings = {
    orientation: 'TB'
  };


  links: TreeEdgeModel[];
  nodes: TreeNodeModel[];
  gotDate = false;


  constructor(private store: Store<{ tree: TreeState }>) {
  }

  ngOnInit() {
    if (this.tree) {
      this.nodes = this.tree.nodes;
      this.links = this.tree.edges;
    }
    this.zoomToFit$.next(true);
    this.store.select(state => state && state.tree)
      .subscribe(
        tree => {
          console.log(`${TheTreesComponent.name}.ngOnInit store sub tree`, tree);
          if (tree && tree.treeData) {
            this.nodes = tree.treeData.nodes;
            this.links = tree.treeData.edges;
            this.gotDate = true;
          }
        }
      );
  }

  ngAfterViewInit() {
    console.log(`${TheTreesComponent.name}.ngAfterViewInit graphComponent in after view`, this.graphComponent);
    this.graphChildren.changes.subscribe((thing) => {
      console.log(`${TheTreesComponent.name}.ngAfterViewInit children change thing is `, thing);

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

    console.log(`${TheTreesComponent.name}.changeLayout layoutSettings`, this.layoutSettings);
  }

  ngAfterViewChecked(): void {

  }

  ngAfterContentChecked(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`${TheTreesComponent.name}.ngOnChanges`, changes);
    this.zoomToFit$.next(true);
  }
}
