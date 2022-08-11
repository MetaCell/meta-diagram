import { MetaOptions } from './MetaOptions';
import { Position } from './Position';

export class MetaNode {
  children: MetaNode[];
  options: MetaOptions;

  constructor(
    id: string,
    name: string,
    shape: string,
    position: Position,
    variant: string,
    options: Map<string, any>
  ) {
    if (options === undefined) {
      options = new Map<string, any>();
    }
    this.children = [];
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
