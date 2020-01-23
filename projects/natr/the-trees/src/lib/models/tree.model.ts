import {Graph} from '@swimlane/ngx-graph';
import {TreeNodeModel} from './tree-node.model';
import {TreeEdgeModel} from './tree-edge.model';

export interface TreeModel<ND = any, NM = any, ED = any, EL = any> extends Graph {
  nodes: TreeNodeModel<ND, NM>[];
  edges: TreeEdgeModel<ED>[];
  edgeLabels?: EL;
}

