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
    // TODO: serialize children (bottom up or memoization)
    const metaNodeModel = new MetaNodeModel(Object.fromEntries(mn.options.options))
    // @ts-ignore
    metaNodeModel.registerListener({positionChanged: (event => handlePositionChanged(event))})
    metaNodeModels.push(metaNodeModel)
  }
  return metaNodeModels
}

function handlePositionChanged(e: any){
  // todo: calculate e.entity.position offset apply the same to e.entity.children
  console.log(e)
}