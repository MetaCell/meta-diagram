import { MetaNodeModel } from '../react-diagrams/MetaNodeModel';
import {MetaNode} from "../models/MetaNode";

export function getNode(
  id: string,
  nodes: MetaNodeModel[]
): MetaNodeModel | undefined {
  return nodes.find(n => n.getOptions().id === id);
}

export function processNodes(metaNodes: MetaNode[]) : MetaNodeModel[] {
  const metaNodeModels = []
  for(const mn of metaNodes){
    const metaNodeModel = new MetaNodeModel(Object.fromEntries(mn.options.options))
    metaNodeModel.registerListener({positionChanged: () => { console.log("positionChanged") }})
    metaNodeModels.push(metaNodeModel)
  }
  return metaNodeModels
}