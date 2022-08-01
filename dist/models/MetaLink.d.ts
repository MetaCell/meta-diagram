import { ILink } from './ILink';
import { MetaLinkModel } from "../react-diagrams/MetaLinkModel";
export declare class MetaLink implements ILink {
    sourceId: string;
    sourcePortId: string;
    targetId: string;
    targetPortId: string;
    options: Map<string, any>;
    constructor(id: string, name: string, shape: string, sourceId: string, sourcePortId: string, targetId: string, targetPortId: string, options: Map<string, any>);
    getSourceId(): string;
    getSourcePortId(): string;
    getTargetId(): string;
    getTargetPortId(): string;
    toModel(): MetaLinkModel;
}
