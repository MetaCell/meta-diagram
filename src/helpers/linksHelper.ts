import { MetaLink } from '../models/MetaLink';
import { MetaLinkModel } from '../react-diagrams/MetaLinkModel';
import { MetaNodeModel } from '../react-diagrams/MetaNodeModel';
import { getNode } from './nodesHelper';

export function getLinkModel(
  metaLink: MetaLink,
  nodes: MetaNodeModel[]
): MetaLinkModel | undefined {
  const link = new MetaLinkModel(Object.fromEntries(metaLink.options.options));
  const source = getNode(metaLink.getSourceId(), nodes);
  const target = getNode(metaLink.getTargetId(), nodes);
  if (source && target) {
    link.setSourcePort(source.getPort(metaLink.getSourcePortId()));
    link.setTargetPort(target.getPort(metaLink.getTargetPortId()));
    return link;
  }
  return undefined;
}
