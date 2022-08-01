import { IShape } from './IShape';
import { IId } from './IId';
export declare class MetaOptions implements IShape, IId {
    options: Map<string, any>;
    constructor(id: string, name: string, shape: string, variant: string, options: Map<string, any>);
    getId(): string;
    getShape(): string;
}
