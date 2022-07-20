/// <reference types="react" />
import { MetaLinkModel } from './MetaLinkModel';
import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
export declare class MetaLinkFactory extends DefaultLinkFactory {
    componentsMap: Map<string, JSX.Element>;
    constructor(componentsMap: Map<string, JSX.Element>);
    generateModel(): MetaLinkModel;
    generateLinkSegment(model: MetaLinkModel, selected: boolean, path: string): JSX.Element;
}
