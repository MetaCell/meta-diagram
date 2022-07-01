import {DefaultLinkModel} from "@projectstorm/react-diagrams";

export class MetaLinkModel extends DefaultLinkModel {
    constructor(options = {}) {
        super({
            ...options,
            type: ReactDiagramMetaTypes.META_LINK
        });
    }
}