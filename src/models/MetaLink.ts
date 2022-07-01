import {MetaOptions} from "./MetaOptions";
import {ILink} from "./ILink";

export class MetaLink implements ILink{
    sourceId: string;
    sourcePortId: string;
    targetId: string;
    targetPortId: string;
    options: MetaOptions;

    constructor(id: string, shape: string,
                sourceId: string, sourcePortId: string,
                targetId: string, targetPortId: string,
                options: Map<string, any>) {
        this.sourceId = sourceId
        this.sourcePortId = sourcePortId
        this.targetId = targetId
        this.targetPortId = targetPortId
        this.options = new MetaOptions(id, shape, options)
    }

    getSourceId(): string {
        return this.sourceId;
    }

    getSourcePortId(): string {
        return this.sourcePortId;
    }

    getTargetId(): string {
        return this.targetId;
    }

    getTargetPortId(): string {
        return this.targetPortId;
    }
}