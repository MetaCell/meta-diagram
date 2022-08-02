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

export function updateChildrenPosition(metaGraph: MetaGraph, parent: MetaNodeModel): void {

  const children = metaGraph.getChildren(parent);
  // // @ts-ignore
  children.forEach(n => {
    /*
        No need to explicitly call updateChildrenPosition for n children because it will happen automatically in
        the event listener
     */
    const localPosition = n.getLocalPosition()
    // @ts-ignore
    n.setPosition(parent.getX() + localPosition.x, parent.getY() + localPosition.y)

  })
}

export function updateNodeLocalPosition(metaGraph: MetaGraph, node: MetaNodeModel): void {
  /*
      Updates relative position from the node that moved to its parent
  */
  const currentParent = metaGraph.getParent(node)
  let parent = currentParent

  if(!node.isInsideParent(currentParent)){
    // metaGraph.detachNode(node)
    // parent = metaGraph.findNewParent(node)
    console.log(false)
  }

  node.updateLocalPosition(parent)
  // updateNodesContainerBoundingBoxes([metaGraph.getRoot(node.getGraphPath()[0]).getNode()], metaGraph)

  // TODO: check if it is still inside the parent or if it started to be inside a node
}


export function updateNodesContainerBoundingBoxes(nodes: MetaNodeModel[], metaGraph: MetaGraph): void {
  /*
    Given a list of nodes, calculates for each the bounding box to contain its children
   */
  nodes.forEach(n => n.setContainerBoundingBox(metaGraph.getNodeContainerBoundingBox(n)))
}

export function registerPositionListener(metaNodeModels: MetaNodeModel[], callback: { (event: any): void; (arg0: BaseEntityEvent<NodeModel<NodeModelGenerics>>): void; }){
  // @ts-ignore
  metaNodeModels.forEach(metaNodeModel => metaNodeModel.registerListener({positionChanged: (event => callback(event))}))
}

