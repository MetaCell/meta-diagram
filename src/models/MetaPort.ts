import { Position } from './Position';
import { PortTypes } from '../constants';

export class MetaPort {
  id: string;
  name: string;
  type: PortTypes;
  position: Position;

  constructor(
    id: string,
    name: string,
    type: PortTypes,
    position: Position,
    options: Map<string, any>
  ) {
    if (options === undefined) {
      options = new Map<string, any>();
    }
    this.id = id;
    this.name = name;
    this.type = type;
    this.position = position;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): string {
    return this.type;
  }
}
