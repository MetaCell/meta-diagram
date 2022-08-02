import { NodeModel } from '@projectstorm/react-diagrams';
import { MetaGraph } from "../models/MetaGraph";
export declare class MetaNodeModel extends NodeModel {
    constructor(options?: {});
    getGraphPath(): string[];
    private calculateLocalPosition;
    getContainerBoundingBox(metaGraph: MetaNodeModel[]): any;
    updateLocalPosition(metaGraph: MetaGraph): void;
    setContainerBoundingBox(containerBoundingBox: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }): void;
}
