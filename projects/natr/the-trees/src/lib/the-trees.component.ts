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
  ViewChildren
} from '@angular/core';
import {GraphComponent} from '@swimlane/ngx-graph';
import {Store} from '@ngrx/store';
import {TreeState} from './+state/reducers/tree.reducer';
import {TreeNodeModel} from './models/tree-node.model';
import {TreeEdgeModel} from './models/tree-edge.model';
import {TreeModel} from './models/tree.model';
import {Subject} from 'rxjs';

import * as lo from 'lodash';
import {HistorianService, Logging} from '@natr/historian';
import {TreeAttributesModel} from './models/tree-attributes.model';
import {treeClick, treeZoom} from './+state/actions/tree.actions';
import {selectTreeData} from './+state/selectors/tree.selectors';

@Logging
@Component({
  selector: 'lib-the-trees',
  templateUrl: 'the-trees.component.html',
  styleUrls: ['the-trees.component.scss']
})
export class TheTreesComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, OnChanges {

  constructor(private store: Store<{ tree: TreeState }>) {
    this.logger.debug('tree attributes before', this.treeAttributes);
    // this.treeAttributes = {...TheTreesComponent.attributeDefaults, ...this.treeAttributes};
    // this.logger.debug('tree attributes after', this.treeAttributes);
  }

  private attributeDefaults = {
    nodes: [],
    links: [],
    clusters: [],
    layout: 'dagre',
    draggingEnabled: true,
    panningEnabled: true,
    panningAxis: 'both',
    enableZoom: true,
    animate: false,
    zoomSpeed: 0.1,
    minZoomLevel: 0.1,
    maxZoomLevel: 4,
    autoZoom: false,
    panOnZoom: true,
    autoCenter: false
  } as TreeAttributesModel;

  @ContentChild('linkTemplate') linkTemplate: TemplateRef<any>;
  @ContentChild('nodeTemplate') nodeTemplate: TemplateRef<any>;
  @ContentChild('clusterTemplate') clusterTemplate: TemplateRef<any>;
  @ContentChild('defsTemplate') defsTemplate: TemplateRef<any>;

  @ViewChild('graphComponent') graphComponent: GraphComponent;
  @ViewChildren(GraphComponent) graphChildren: QueryList<GraphComponent>;

  @Input() tree: TreeModel;
  @Input() viewDimensions: number[] = [400, 800];
  @Input() zoomToFit$: Subject<boolean> = new Subject<boolean>();
  @Input() treeAttributes;
  @Input() layoutSettings = {
    orientation: 'TB'
  };
  links: TreeEdgeModel[];
  nodes: TreeNodeModel[];
  gotData = false;

  private logger: HistorianService;

  ngOnInit() {
    this.logger.debug('tree attributes before', this.treeAttributes);
    if (this.tree) {
      this.gotData = true;
      this.nodes = lo.cloneDeep(this.tree.nodes);
      this.links = lo.cloneDeep(this.tree.edges);
    }
    this.zoomToFit$.next(true);
    this.store.select(selectTreeData)
      .subscribe(
        tree => {
          this.logger.debug(`store sub tree`, tree);
          if (tree) {
            this.nodes = lo.cloneDeep(tree.nodes);
            this.links = lo.cloneDeep(tree.edges);
            this.gotData = true;
          }
        }
      );
    this.setDefaults();
  }

  private setDefaults() {
    this.logger.debug('tree attributes before', this.treeAttributes);
    this.treeAttributes = {...this.attributeDefaults, ...this.treeAttributes};
    this.logger.debug('tree attributes after', this.treeAttributes);
  }

  ngAfterViewInit() {
    this.logger.debug('tree attributes before', this.treeAttributes);
    this.setComponents();
    this.logger.debug(`graphComponent in after view`, this.graphComponent);
    this.logger.debug(`graphChildren`, this.graphChildren);
    this.logger.debug(`nodeTemplate`, this.nodeTemplate);
    this.logger.debug(`linkTemplate`, this.linkTemplate);
    this.logger.debug(`clusterTemplate`, this.clusterTemplate);
    this.logger.debug(`defsTemplate`, this.defsTemplate);
    this.graphChildren.changes.subscribe((thing) => {
      this.logger.debug(`children change thing is `, thing);
      this.setComponents();
    });
  }

  private setComponents() {
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
  }

  zoomChange(event: number) {
    this.store.dispatch(treeZoom({zoom: event}));
  }

  clickHandler(event: MouseEvent) {
    this.store.dispatch(treeClick({clickEvent: event}));
  }

  ngAfterViewChecked(): void {
    // this.logger.debug('tree attributes before', this.treeAttributes);

  }

  ngAfterContentChecked(): void {
    // this.logger.debug('tree attributes before', this.treeAttributes);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.logger.debug('changes', changes);

    this.zoomToFit$.next(true);
  }
}
