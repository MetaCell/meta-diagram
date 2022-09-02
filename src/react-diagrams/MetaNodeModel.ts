import { Position } from "../models/Position";
import { MetaPort } from '../models/MetaPort';
import { PortTypes, ReactDiagramMetaTypes } from '../constants';
import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';

export class MetaNodeModel extends NodeModel {
    constructor(options = {}) {
        super({
            ...options,
            type: ReactDiagramMetaTypes.META_NODE,
        });

        // @ts-ignore
        options?.ports?.forEach((port: MetaPort) => {
          switch (port.getType()) {
            case PortTypes.INPUT_PORT:
              this.addPort(
                new DefaultPortModel({
                  in: true,
                  name: port.getName(),
                })
              );
              break;
            case PortTypes.OUTPUT_PORT:
              this.addPort(
                new DefaultPortModel({
                  in: false,
                  name: port.getName(),
                })
              );
              break;
            case PortTypes.PARAMETER_PORT:
              console.log('parameter type found!');
              break;
            default:
              console.error('Port type');
          }
        });
    }

    getGraphPath(): string[]{
        // @ts-ignore
        return [...this.getOptions()['graphPath']]
    }

    getLocalPosition(): Position{
        // @ts-ignore
        return this.getOptions()['localPosition']
    }

    // TODO: Change to consider mouse position; Currently considering top left corner
    isInsideParent(parent: MetaNodeModel | undefined): boolean {
        return parent ? parent.getBoundingBox().containsPoint(this.getPosition()) : true
    }

    private calculateLocalPosition(parent: MetaNodeModel | undefined): Position {
        const worldPosition = new Position(this.getX(), this.getY())
        const parentWorldPosition = parent ? new Position(parent.getX(), parent.getY()): new Position(0,0)
        return worldPosition.sub(parentWorldPosition)
    }

    updateLocalPosition(parent: MetaNodeModel | undefined): void {
        // @ts-ignore
        this.options['localPosition'] =  this.calculateLocalPosition(parent)
    }

    setContainerBoundingBox(containerBoundingBox: {left: number, top: number, right: number, bottom: number}): void {
        // @ts-ignore
        this.options['containerBoundingBox'] =  containerBoundingBox
    }
}
