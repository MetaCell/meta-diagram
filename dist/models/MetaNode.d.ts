import { MetaOptions } from './MetaOptions';
import { Position } from './Position';
export declare class MetaNode {
    children: MetaNode[];
    options: MetaOptions;
    constructor(id: string, name: string, shape: string, position: Position, options: Map<string, any>);
}
