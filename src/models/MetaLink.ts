import { ILink } from './ILink';
import { MetaLinkModel } from '../react-diagrams/MetaLinkModel';

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
    variant: string,
    options: Map<string, any>
  ) {
    if (options === undefined) {
      options = new Map<string, any>();
    }
    this.sourceId = sourceId;
    this.sourcePortId = sourcePortId;
    this.targetId = targetId;
    this.targetPortId = targetPortId;
    this.options = options;
    this.options.set('id', id);
    this.options.set('name', name);
    this.options.set('shape', shape);
    this.options.set('varian', variant);
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

  getId(): string {
    return this.options.get('id');
  }

  getName(): string {
    return this.options.get('name');
  }

  getShape(): string {
    return this.options.get('shape');
  }

  toModel(): MetaLinkModel {
    return new MetaLinkModel(Object.fromEntries(this.options));
  }
}
