import { Position } from './Position';
import { MetaPort } from './MetaPort';
import {MetaNodeModel} from "../react-diagrams/MetaNodeModel";

export class MetaNode {
  private readonly parent: MetaNode | undefined;
  private readonly position: Position;
  private readonly options: Map<string, any>;

  constructor(
    id: string,
    name: string,
    shape: string,
    position: Position,
    variant: string,
    parent: MetaNode | undefined,
    ports: Array<MetaPort>,
    options: Map<string, any>
  ) {
    this.parent = parent
    this.position = position
    this.options = new Map(options)
    this.options.set('id', id);
    this.options.set('name', name);
    this.options.set('shape', shape);
    this.options.set('ports', ports);
    this.options.set('variant', variant);
    this.options.set('position', position);
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

  private getGraphPath() : string[] {
    if(this.parent){
      const graphPath = this.parent.getGraphPath()
      graphPath.push(<string>this.getId())
      return graphPath
    }
    return [this.getId()]
  }

  private getWorldPosition() : Position {
    return this.parent ? this.position.add(this.parent?.getWorldPosition()) : this.position
  }

  getDepth() : number {
    return this.parent ? this.parent.getDepth() + 1 : 0
  }

  toModel() : MetaNodeModel {
    const optionsMap = new Map(this.options)
    optionsMap.set('graphPath', this.getGraphPath())
    optionsMap.set('localPosition', this.position)
    optionsMap.set('depth', this.getDepth())
    const metaNodeModel =  new MetaNodeModel(Object.fromEntries(optionsMap))
    const worldPosition = this.getWorldPosition()
    metaNodeModel.setPosition(worldPosition.x, worldPosition.y)
    return metaNodeModel
  }

}
