import { MetaPort } from './MetaPort';
import { Position } from './Position';
import { MetaOptions } from './MetaOptions';

export class MetaNode {
  children: MetaNode[];
  options: MetaOptions;

  constructor(
    id: string,
    name: string,
    shape: string,
    position: Position,
    variant: string,
    ports: Map<string, MetaPort>,
    options: Map<string, any>
  ) {
    if (options === undefined) {
      options = new Map<string, any>();
    }
    this.children = [];
    options.set('ports', ports);
    options.set('position', position);
    this.options = new MetaOptions(id, name, shape, variant, options);
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
