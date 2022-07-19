import { MetaNode } from './models/MetaNode';
import { MetaLink } from './models/MetaLink';
import { ComponentsMap } from './models/ComponentsMap';
import { MetaNodeModel } from './react-diagrams/MetaNodeModel';
interface MetaDiagramProps {
    metaNodes: MetaNode[];
    metaLinks: MetaLink[];
    componentsMap: ComponentsMap;
    wrapperClassName?: string;
    canvasClassName?: string;
}
declare const MetaDiagram: ({ metaNodes, metaLinks, componentsMap, wrapperClassName, canvasClassName, }: MetaDiagramProps) => JSX.Element;
export default MetaDiagram;
export { MetaNode, MetaLink, MetaNodeModel, ComponentsMap };
export { MetaLinkModel } from './react-diagrams/MetaLinkModel';
export { Position } from './models/Position';
export { DefaultLinkWidget } from "@projectstorm/react-diagrams";
