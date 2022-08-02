import { Position } from './Position';
import { MetaNodeModel } from "../react-diagrams/MetaNodeModel";
export declare class MetaNode {
    private readonly parent;
    private readonly position;
    private readonly options;
    constructor(id: string, name: string, shape: string, position: Position, parent: MetaNode | undefined, options: Map<string, any>);
    private getId;
    private getGraphPath;
    private getWorldPosition;
    getDepth(): number;
    toModel(): MetaNodeModel;
}
