import { MetaNode } from "../models/MetaNode";
import { BaseEntityEvent } from "@projectstorm/react-canvas-core";
import { NodeModel, NodeModelGenerics } from "@projectstorm/react-diagrams";
import { MetaGraph } from "../models/MetaGraph";
import { MetaNodeModel } from "../react-diagrams/MetaNodeModel";
export declare function generateMetaGraph(metaNodes: MetaNode[]): MetaGraph;
export declare function updateChildrenPosition(metaGraph: MetaGraph, parent: MetaNodeModel): void;
export declare function updateNodeLocalPosition(metaGraph: MetaGraph, node: MetaNodeModel): void;
export declare function updateNodesContainerBoundingBoxes(nodes: MetaNodeModel[], metaGraph: MetaGraph): void;
export declare function registerPositionListener(metaNodeModels: MetaNodeModel[], callback: {
    (event: any): void;
    (arg0: BaseEntityEvent<NodeModel<NodeModelGenerics>>): void;
}): void;
