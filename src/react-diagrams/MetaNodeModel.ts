import { Position } from "../models/Position";
import { MetaPort } from '../models/MetaPort';
import { PortTypes, ReactDiagramMetaTypes, CallbackTypes } from '../constants';
import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';
import { BoundingBox } from "../models/BoundingBox";

export class MetaNodeModel extends NodeModel {
    private boundingBox: BoundingBox;
    constructor(options = {}) {
        super({
            ...options,
            type: ReactDiagramMetaTypes.META_NODE,
        });
        // @ts-ignore
        if (options.width && options.height) {
          // @ts-ignore
          this.updateDimensions({width: options.width, height: options.height});
        }

        this.boundingBox = new BoundingBox(
          this.getX(),
          this.getY(),
          this.getX() + this.width,
          this.getY() + this.height,
        )

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

    setOption(label: string, newValue: any, triggerUpdate?: boolean|undefined) {
      // @ts-ignore
      this.options[label] = newValue;
      if (triggerUpdate) {
        this.flagUpdate(CallbackTypes.OPTIONS_UPDATED);
      }
    }

    getOption(label: string): any {
      // @ts-ignore
      return this.getOptions()[label]
    }

    flagUpdate(updateType: CallbackTypes, extraCondition?: CallbackTypes) {
      this.fireEvent({node: this, function: updateType, extraCondition: extraCondition}, updateType);
    }

    getId(): string[]{
      return [...this.getOption('id')]
    }

    getGraphPath(): string[]{
      return [...this.getOption('graphPath')]
    }

    getLocalPosition(): Position{
      return this.getOption('localPosition');
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
      this.setOption('localPosition', this.calculateLocalPosition(parent))
    }

    setNodeBoundingBox(containerBoundingBox: {left: number, top: number, right: number, bottom: number}): void {
      this.boundingBox = new BoundingBox(
        containerBoundingBox.left,
        containerBoundingBox.top,
        containerBoundingBox.right,
        containerBoundingBox.bottom
      );
    }

    updateSize(width: number, height: number) {
      this.updateDimensions({width, height});
      this.flagUpdate(CallbackTypes.NODE_RESIZED);
    }

    getNodeBoundingBox(): BoundingBox {
      return this.boundingBox;
    }
}
