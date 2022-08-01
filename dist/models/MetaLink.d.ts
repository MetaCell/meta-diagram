import { MetaOptions } from './MetaOptions';
import { ILink } from './ILink';
export declare class MetaLink implements ILink {
    sourceId: string;
    sourcePortId: string;
    targetId: string;
    targetPortId: string;
    options: MetaOptions;
    constructor(id: string, name: string, shape: string, sourceId: string, sourcePortId: string, targetId: string, targetPortId: string, variant: string, options: Map<string, any>);
    getSourceId(): string;
    getSourcePortId(): string;
    getTargetId(): string;
    getTargetPortId(): string;
}
