import {Observable} from 'rxjs';
import {ClusterNode, Edge} from '@swimlane/ngx-graph';
import {TreeNodeModel} from './tree-node.model';
import {TreeEdgeModel} from './tree-edge.model';

export interface TreeAttributesModel {
  view?:	number[];
  nodes:	TreeNodeModel[];
  links?:	TreeEdgeModel[];
  clusters?: ClusterNode[];
  layout?:	string;
  layoutSettings?:	any;
  curve?:	any;
  draggingEnabled?:	boolean;
  panningEnabled?:	boolean;
  panOffsetX?:	number;
  panOffsetY?:	number;
  panningAxis?:	'both' | 'horizontal' | 'vertical';
  enableZoom?:	boolean;
  animate?:	boolean;
  zoomSpeed?:	number;
  minZoomLevel?:	number;
  maxZoomLevel?:	number;
  zoomLevel?:	number;
  autoZoom?: boolean;
  panOnZoom?: boolean;
  autoCenter?: boolean;
  update$?: Observable<any>;
  center$?: Observable<any>;
  zoomToFit$?: Observable<any>;
  panToNode$?: Observable<any>;
}
