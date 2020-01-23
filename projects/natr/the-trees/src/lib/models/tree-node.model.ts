import {Node} from '@swimlane/ngx-graph';

export interface TreeNodeModel<D = any, M = any> extends Node {
  data?: D;
  meta?: M;
}

