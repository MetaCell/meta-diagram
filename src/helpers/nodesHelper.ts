import { MetaNodeModel } from '../react-diagrams/MetaNodeModel';

export function getNode(
  id: string,
  nodes: MetaNodeModel[]
): MetaNodeModel | undefined {
  return nodes.find(n => n.getOptions().id === id);
}
