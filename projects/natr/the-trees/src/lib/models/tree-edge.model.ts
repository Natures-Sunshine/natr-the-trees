import {Edge} from '@swimlane/ngx-graph';

export interface TreeEdgeModel<D = any> extends Edge {
  data?: D;
}

