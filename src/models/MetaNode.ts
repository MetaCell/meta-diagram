import { Position } from './Position';
import {MetaNodeModel} from "../react-diagrams/MetaNodeModel";

export class MetaNode {
  private readonly parent: MetaNode | undefined;
  private readonly position: Position;
  private readonly options: Map<string, any>;;

  constructor(
    id: string,
    name: string,
    shape: string,
    position: Position,
    parent: MetaNode | undefined,
    options: Map<string, any>
  ) {
    this.parent = parent
    this.position = position
    this.options = options
    this.options.set('id', id);
    this.options.set('name', name);
    this.options.set('shape', shape);
  }

  getId() : string{
    return this.options.get('id')
  }

  getParentId() : string | undefined {
    return this.parent?.getId()
  }

  getWorldPosition() : Position {
    return this.parent ? this.position.add(this.parent?.getWorldPosition()) : this.position
  }

  toModel() : MetaNodeModel {
    const optionsMap = this.options
    optionsMap.set('parentId', this.getParentId())
    optionsMap.set('position', this.position)
    return new MetaNodeModel(Object.fromEntries(optionsMap))
  }

}
