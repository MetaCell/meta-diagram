import { NodeModel } from '@projectstorm/react-diagrams';
import { MetaGraph } from "../models/MetaGraph";
export declare class MetaNodeModel extends NodeModel {
    constructor(options?: {});
    getGraphPath(): string[];
    private calculateLocalPosition;
    getContainerBoundingBox(nodes: MetaNodeModel[]): any;
    updateLocalPosition(metaGraph: MetaGraph): void;
    updateContainerBoundingBox(nodes: MetaNodeModel[]): void;
}
