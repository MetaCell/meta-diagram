import {DefaultPortModel, NodeModel} from "@projectstorm/react-diagrams";

export class MetaNodeModel extends NodeModel {
    constructor(options = {}) {
        super({
            ...options,
            type: ReactDiagramMetaTypes.META_NODE
        });

        // set up an in and out port

        this.addPort(
            new DefaultPortModel({
                in: true,
                name: 'in'
            })
        );
        this.addPort(
            new DefaultPortModel({
                in: false,
                name: 'out'
            })
        );
    }
}