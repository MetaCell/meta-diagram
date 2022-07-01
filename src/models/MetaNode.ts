import {MetaOptions} from "./MetaOptions";
import {Position} from "./Position";

export class MetaNode {
    name: string;
    children: MetaNode[];
    options: MetaOptions;
    position: Position;

    constructor(id: string, name: string, shape: string, options: Map<string, any>, position: Position) {
        this.name = name;
        this.children = []
        this.options = new MetaOptions(id, shape, options)
        this.position = position
    }
}