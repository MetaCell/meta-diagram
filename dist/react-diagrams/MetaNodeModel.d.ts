import { NodeModel } from '@projectstorm/react-diagrams';
import { Position } from "../models/Position";
export declare class MetaNodeModel extends NodeModel {
    constructor(options?: {});
    getLocalPosition(nodes: MetaNodeModel[]): Position;
    updateLocalPosition(nodes: MetaNodeModel[]): void;
}
