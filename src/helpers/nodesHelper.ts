import {MetaNode} from "../models/MetaNode";
import {BaseEntityEvent} from "@projectstorm/react-canvas-core";
import {NodeModel, NodeModelGenerics} from "@projectstorm/react-diagrams";
import {MetaGraph} from "../models/MetaGraph";
import {MetaNodeModel} from "../react-diagrams/MetaNodeModel";


export function generateMetaGraph(metaNodes: MetaNode[]) : MetaGraph {
  const metaGraph = new MetaGraph()
  metaNodes.sort(function(a, b) {
    return a.getDepth() - b.getDepth();
  });

  for(const mn of metaNodes){

    const metaNodeModel = mn.toModel()

    metaGraph.addNode(metaNodeModel)
  }
  return metaGraph
}

export function registerPositionListener(metaNodeModels: MetaNodeModel[], callback: { (event: any): void; (arg0: BaseEntityEvent<NodeModel<NodeModelGenerics>>): void; }){
  // @ts-ignore
  metaNodeModels.forEach(metaNodeModel => metaNodeModel.registerListener({positionChanged: (event => callback(event))}))
}

