import { MetaNode } from "../models/MetaNode";
import { BaseEntityEvent } from "@projectstorm/react-canvas-core";
import { NodeModel, NodeModelGenerics } from "@projectstorm/react-diagrams";
import { MetaGraph } from "../models/MetaGraph";
import { MetaNodeModel } from "../react-diagrams/MetaNodeModel";
export declare function generateMetaGraph(metaNodes: MetaNode[]): MetaGraph;
export declare function registerPositionListener(metaNodeModels: MetaNodeModel[], callback: {
    (event: any): void;
    (arg0: BaseEntityEvent<NodeModel<NodeModelGenerics>>): void;
}): void;
