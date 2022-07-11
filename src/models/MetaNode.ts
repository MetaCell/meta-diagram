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
    options: Map<string, any>
  ) {
    this.children = [];
    options.set('position', position);
    this.options = new MetaOptions(id, name, shape, options);
  }
}