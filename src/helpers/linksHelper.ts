import { MetaLink } from '../models/MetaLink';
import { MetaLinkModel } from '../react-diagrams/MetaLinkModel';
import {MetaGraph} from "../models/MetaGraph";

export function getLinkModel(
  metaLink: MetaLink,
  metaGraph: MetaGraph
): MetaLinkModel | undefined {
  const link = metaLink.toModel();
  const source = metaGraph.getNodeDFS(metaLink.getSourceId());
  const target = metaGraph.getNodeDFS(metaLink.getTargetId());
  if (source && target) {
    link.setSourcePort(source.getPort(metaLink.getSourcePortId()));
    link.setTargetPort(target.getPort(metaLink.getTargetPortId()));
    return link;
  }
  return undefined;
}
