import { ILink } from './ILink';
import {MetaLinkModel} from "../react-diagrams/MetaLinkModel";

export class MetaLink implements ILink {
  sourceId: string;
  sourcePortId: string;
  targetId: string;
  targetPortId: string;
  options: Map<string, any>;

  constructor(
    id: string,
    name: string,
    shape: string,
    sourceId: string,
    sourcePortId: string,
    targetId: string,
    targetPortId: string,
    options: Map<string, any>
  ) {
    this.sourceId = sourceId;
    this.sourcePortId = sourcePortId;
    this.targetId = targetId;
    this.targetPortId = targetPortId;
    this.options = options;
    this.options.set('id', id);
    this.options.set('name', name);
    this.options.set('shape', shape);
  }

  getSourceId(): string {
    return this.sourceId;
  }

  getSourcePortId(): string {
    return this.sourcePortId;
  }

  getTargetId(): string {
    return this.targetId;
  }

  getTargetPortId(): string {
    return this.targetPortId;
  }

  toModel(): MetaLinkModel {
    return new MetaLinkModel(Object.fromEntries(this.options))
  }
}
