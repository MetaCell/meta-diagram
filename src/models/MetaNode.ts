import { MetaOptions } from './MetaOptions';
import { Position } from './Position';

export class MetaNode {
  options: MetaOptions;

  constructor(
    id: string,
    name: string,
    shape: string,
    position: Position,
    children: MetaNode[] = [],
    options: Map<string, any>
  ) {
    options.set('children', children);
    options.set('position', position);
    this.options = new MetaOptions(id, name, shape, options);
  }
}
