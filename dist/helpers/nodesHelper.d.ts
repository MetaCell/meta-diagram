import { MetaNodeModel } from '../react-diagrams/MetaNodeModel';
import { MetaNode } from "../models/MetaNode";
import { BaseEntityEvent } from "@projectstorm/react-canvas-core";
import { NodeModel, NodeModelGenerics } from "@projectstorm/react-diagrams";
export declare function getNode(id: string, nodes: MetaNodeModel[]): MetaNodeModel | undefined;
export declare function processNodes(metaNodes: MetaNode[], callback: {
    (event: any): void;
    (arg0: BaseEntityEvent<NodeModel<NodeModelGenerics>>): void;
}): MetaNodeModel[];
