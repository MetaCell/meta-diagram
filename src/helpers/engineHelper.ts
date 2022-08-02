import {MetaNodeModel} from "../react-diagrams/MetaNodeModel";
import {MetaGraph} from "../models/MetaGraph";

export function updateChildrenPosition(metaGraph: MetaGraph, parent: MetaNodeModel): void {

    const children = metaGraph.getChildren(parent);
    // // @ts-ignore
    children.forEach(n => {
        /*
            No need to explicitly call updateChildrenPosition for n children because it will happen automatically in
            the event listener
         */
        // @ts-ignore
        n.setPosition(parent.getX() + n.options['localPosition'].x, parent.getY() + n.options['localPosition'].y)

    })
}

export function updateNodeLocalPosition(metaGraph: MetaGraph, node: MetaNodeModel): void {
    /*
        Updates relative position from the node that moved to its parent
    */
    node.updateLocalPosition(metaGraph)
    // TODO: check if it is still inside the parent or if it started to be inside a node
}

// @ts-ignore
export function updateNodesContainerBoundingBoxes(nodes: MetaNodeModel[], metaGraph: MetaGraph): void {
    nodes.forEach(n => n.setContainerBoundingBox(metaGraph.getNodeContainerBoundingBox(n)))
    console.log(nodes)
}