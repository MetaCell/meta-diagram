import { MetaOptions } from './MetaOptions';
import { ILink } from './ILink';

export class MetaLink implements ILink {
  sourceId: string;
  sourcePortId: string;
  targetId: string;
  targetPortId: string;
  options: MetaOptions;

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
    this.options = new MetaOptions(id, name, shape, variant, options);
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
    return this.options.getId();
  }

  getName(): string {
    return this.options.getName();
  }

  getShape(): string {
    return this.options.getShape();
  }
}
