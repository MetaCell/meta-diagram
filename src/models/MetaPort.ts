import { PortTypes } from "../constants";
import { Point } from "@projectstorm/geometry";

export class MetaPort {
  id: string;
  name: string;
  type: PortTypes;
  position: Point;

  constructor(
    id: string,
    name: string,
    type: PortTypes,
    position: Point,
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

  serialise(): any {
    return {
      id: this.getId(),
      name: this.getName(),
      type: this.getType()
    };
  }
}
