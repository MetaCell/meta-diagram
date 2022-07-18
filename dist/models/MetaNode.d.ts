import { MetaOptions } from './MetaOptions';
import { Position } from './Position';
export declare class MetaNode {
    options: MetaOptions;
    constructor(id: string, name: string, shape: string, position: Position, children: MetaNode[] | undefined, options: Map<string, any>);
}
