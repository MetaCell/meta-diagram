import {DefaultPortModel, NodeModel} from '@projectstorm/react-diagrams';
import {ReactDiagramMetaTypes} from '../constants';
import {Position} from "../models/Position";

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

    getLocalPosition(): Position{

        // @ts-ignore
        return this.getOptions()['localPosition']
    }

    // TODO: Change to consider mouse position; Currently considering top left corner
    isInsideParent(parent: MetaNodeModel | undefined): boolean {
        return parent ? parent.getBoundingBox().containsPoint(this.getPosition()) : true
    }

    private calculateLocalPosition(parent: MetaNodeModel | undefined): Position {
        const worldPosition = new Position(this.getX(), this.getY())
        const parentWorldPosition = parent ? new Position(parent.getX(), parent.getY()): new Position(0,0)
        return worldPosition.sub(parentWorldPosition)
    }

    updateLocalPosition(parent: MetaNodeModel | undefined): void {
        // @ts-ignore
        this.options['localPosition'] =  this.calculateLocalPosition(parent)
    }

    setContainerBoundingBox(containerBoundingBox: {left: number, top: number, right: number, bottom: number}): void {
        // @ts-ignore
        this.options['containerBoundingBox'] =  containerBoundingBox
    }

}
