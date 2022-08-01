import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';
import { ReactDiagramMetaTypes } from '../constants';
import {Position} from "../models/Position";
import {getNode} from "../helpers/nodesHelper";

export class MetaNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: ReactDiagramMetaTypes.META_NODE,
    });

    // set up an in and out port

    this.addPort(
      new DefaultPortModel({
        in: true,
        name: 'in',
      })
    );
    this.addPort(
      new DefaultPortModel({
        in: false,
        name: 'out',
      })
    );
  }

    getLocalPosition(nodes: MetaNodeModel[]): Position {
        const worldPosition = new Position(this.getX(), this.getY())
        // @ts-ignore
        const parentId = this.options['parentId']
        const parent = getNode(parentId, nodes)
        return parent ? worldPosition.sub(parent.getLocalPosition(nodes)) : worldPosition
    }

    updateLocalPosition(nodes: MetaNodeModel[]) : void {
        // @ts-ignore
        this.options['position'] = this.getLocalPosition(nodes)
    }
}
