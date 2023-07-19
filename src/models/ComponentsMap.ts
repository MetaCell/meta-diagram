import React from 'react';

export class ComponentsMap {
  nodes: Map<string, React.ComponentType>;
  links: Map<string, React.ComponentType>;

  constructor(
    nodesMap: Map<string, React.ComponentType>,
    linksMap: Map<string, React.ComponentType>
  ) {
    this.nodes = nodesMap;
    this.links = linksMap;
  }
}
