import {DefaultPortModel, NodeModel} from '@projectstorm/react-diagrams';
import {ReactDiagramMetaTypes} from '../constants';
import {Position} from "../models/Position";
import {MetaGraph} from "../models/MetaGraph";

export class MetaNodeModel extends NodeModel {
    constructor(options = {}) {
        super({
            ...options,
            type: ReactDiagramMetaTypes.META_NODE,
        });

        // set up an in and out port

        this.addPort(
            new DefaultPortModel({
                in: true,
                name: 'in',
            })
        );
        this.addPort(
            new DefaultPortModel({
                in: false,
                name: 'out',
            })
        );
    }


    getGraphPath(): string[]{
        // @ts-ignore
        return [...this.getOptions()['graphPath']]
    }

    private calculateLocalPosition(metaGraph: MetaGraph): Position {
        const worldPosition = new Position(this.getX(), this.getY())
        // @ts-ignore
        const parent = metaGraph.getParent(this)
        const parentWorldPosition = parent ? new Position(parent.getX(), parent.getY()): new Position(0,0)
        return worldPosition.sub(parentWorldPosition)
    }

    // @ts-ignore
    getContainerBoundingBox(metaGraph: MetaNodeModel[]): any {
        // @ts-ignore

    }

    updateLocalPosition(metaGraph: MetaGraph): void {
        // @ts-ignore
        this.options['localPosition'] =  this.calculateLocalPosition(metaGraph)
    }

    setContainerBoundingBox(containerBoundingBox: {left: number, top: number, right: number, bottom: number}): void {
        // @ts-ignore
        this.options['containerBoundingBox'] =  containerBoundingBox
    }

}
