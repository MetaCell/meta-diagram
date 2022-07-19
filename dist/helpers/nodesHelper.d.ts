import { MetaNodeModel } from '../react-diagrams/MetaNodeModel';
import { MetaNode } from "../models/MetaNode";
export declare function getNode(id: string, nodes: MetaNodeModel[]): MetaNodeModel | undefined;
export declare function processNodes(metaNodes: MetaNode[]): MetaNodeModel[];
