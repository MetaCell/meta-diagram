import { MetaPort } from "../models/MetaPort";
import { PortTypes, ReactDiagramMetaTypes, CallbackTypes } from "../constants";
import { DefaultPortModel, NodeModel } from "@projectstorm/react-diagrams";
import { Point } from "@projectstorm/geometry";
import { subPoints } from "../utils";
import { MetaLinkModel } from "./MetaLinkModel";

export class MetaPortModel extends DefaultPortModel {
  createLinkModel(): MetaLinkModel {
    return new MetaLinkModel();
  }
}

export class MetaNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: ReactDiagramMetaTypes.META_NODE
    });
    // @ts-ignore
    if (options.width && options.height) {
      // @ts-ignore
      this.updateDimensions({ width: options.width, height: options.height });
    }

    // @ts-ignore
    options?.ports?.forEach((port: MetaPort) => {
      switch (port.getType()) {
        case PortTypes.INPUT_PORT:
          this.addPort(
            new MetaPortModel({
              in: true,
              name: port.getName()
            })
          );
          break;
        case PortTypes.OUTPUT_PORT:
          this.addPort(
            new MetaPortModel({
              in: false,
              name: port.getName()
            })
          );
          break;
        case PortTypes.PARAMETER_PORT:
          console.log("parameter type found!");
          break;
        default:
          console.error("Port type");
      }
    });
  }

  setOption(label: string, newValue: any, triggerUpdate?: boolean | undefined) {
    // @ts-ignore
    this.options[label] = newValue;
    if (triggerUpdate) {
      this.flagUpdate(CallbackTypes.OPTIONS_UPDATED);
    }
  }

  flagUpdate(updateType: CallbackTypes, extraCondition?: CallbackTypes) {
    this.fireEvent(
      { node: this, function: updateType, extraCondition: extraCondition },
      updateType
    );
  }

  getOption(label: string): any {
    // @ts-ignore
    return this.getOptions()[label];
  }

  getId(): string[] {
    return [...this.getOption("id")];
  }

  getGraphPath(): string[] {
    return [...this.getOption("graphPath")];
  }

  getLocalPosition(): Point {
    return this.getOption("localPosition");
  }

  private calculateLocalPosition(parent: MetaNodeModel | undefined): Point {
    const worldPosition = new Point(this.getX(), this.getY());
    const parentWorldPosition = parent
      ? new Point(parent.getX(), parent.getY())
      : new Point(0, 0);
    return subPoints(worldPosition, parentWorldPosition);
  }

  updateLocalPosition(parent: MetaNodeModel | undefined): void {
    this.setOption("localPosition", this.calculateLocalPosition(parent));
  }

  updateSize(width: number, height: number) {
    this.updateDimensions({ width, height });
    this.flagUpdate(CallbackTypes.NODE_RESIZED);
  }

  serialise(params: Array<string>) {
    const additionalParams = Object.create({});
    params.forEach(param => {
      additionalParams[param] = this.getOption(param);
    });
    return {
      ...super.serialize(),
      ...additionalParams
    };
  }
}
