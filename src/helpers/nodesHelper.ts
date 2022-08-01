import { MetaNodeModel } from '../react-diagrams/MetaNodeModel';
import {MetaNode} from "../models/MetaNode";
import {BaseEntityEvent} from "@projectstorm/react-canvas-core";
import {NodeModel, NodeModelGenerics} from "@projectstorm/react-diagrams";

export function getNode(
  id: string,
  nodes: MetaNodeModel[]
): MetaNodeModel | undefined {
  return nodes.find(n => n.getOptions().id === id);
}

// @ts-ignore
export function processNodes(metaNodes: MetaNode[], callback: { (event: any): void; (arg0: BaseEntityEvent<NodeModel<NodeModelGenerics>>): void; }) : MetaNodeModel[] {
  const metaNodeModels = []
  for(const mn of metaNodes){
    const metaNodeModel = mn.toModel()
    const position = mn.getWorldPosition()
    metaNodeModel.setPosition(position.x, position.y)
    // @ts-ignore
    //metaNodeModel.registerListener({positionChanged: (event => callback(event))})
    metaNodeModels.push(metaNodeModel)
  }
  return metaNodeModels
}
