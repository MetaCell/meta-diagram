import {IShape} from "./IShape";
import {IId} from "./IId";

export class MetaOptions implements IShape, IId{

    options: Map<string, any>;

    constructor(id: string, name: string, shape: string, options: Map<string, any>)  {
        this.options = options
        this.options.set('id', id)
        this.options.set('name', name)
        this.options.set('shape', shape)
    }

    getId(): string {
        return this.options.get('id');
    }

    getShape(): string {
        return this.options.get('shape')
    }
}