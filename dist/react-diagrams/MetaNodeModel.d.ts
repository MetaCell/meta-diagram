import { NodeModel } from '@projectstorm/react-diagrams';
import { Position } from "../models/Position";
export declare class MetaNodeModel extends NodeModel {
    constructor(options?: {});
    getGraphPath(): string[];
    getLocalPosition(): Position;
    isInsideParent(parent: MetaNodeModel | undefined): boolean;
    private calculateLocalPosition;
    updateLocalPosition(parent: MetaNodeModel | undefined): void;
    setContainerBoundingBox(containerBoundingBox: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }): void;
}
