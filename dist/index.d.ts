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
    metaTheme: {
        customThemeVariables: {};
        canvasClassName: string;
    };
}
declare const MetaDiagram: ({ metaNodes, metaLinks, componentsMap, wrapperClassName, metaTheme, }: MetaDiagramProps) => JSX.Element;
export default MetaDiagram;
export { MetaNode, MetaLink, MetaNodeModel, ComponentsMap };
export { MetaLinkModel } from './react-diagrams/MetaLinkModel';
export { Position } from './models/Position';
