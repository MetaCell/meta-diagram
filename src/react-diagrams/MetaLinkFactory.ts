
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import {MetaLinkModel} from "./MetaLinkModel";
import {UnknownTypeWidget} from "../components/UnknownTypeWidget";

export class MetaLinkFactory extends AbstractReactFactory {
    componentsMap: Map<string, JSX.Element>

    constructor(componentsMap: Map<string, JSX.Element>) {
        super(ReactDiagramMetaTypes.META_LINK);
        this.componentsMap = componentsMap
    }

    generateModel() {
        return new MetaLinkModel();
    }

    generateReactWidget(event: any) : JSX.Element {
        if (this.componentsMap.has(event.model.options.shape)){
            // @ts-ignore
            return this.componentsMap.get(event.model.options.shape)
        }
        // TODO: Generate default link instead
        return UnknownTypeWidget()
    }
}