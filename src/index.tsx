import * as React from 'react';
import { MetaNode } from './models/MetaNode';
import { MetaLink } from './models/MetaLink';
import { ComponentsMap } from './models/ComponentsMap';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { MetaNodeFactory } from './react-diagrams/MetaNodeFactory';
import { MetaLinkFactory } from './react-diagrams/MetaLinkFactory';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { MetaNodeModel } from './react-diagrams/MetaNodeModel';
import { getLinkModel } from './helpers/linksHelper';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(_ => ({
  container: {
    height: '100%',
    width: '100%',
  },
  canvasContainer: {
    height: '100%',
    width: '100%',
    background: '#333333',
  },
}));

interface MetaDiagramProps {
  metaNodes: MetaNode[];
  metaLinks: MetaLink[];
  componentsMap: ComponentsMap;
  wrapperClassName?: string;
  canvasClassName?: string;
}

const MetaDiagram = ({
  metaNodes,
  metaLinks,
  componentsMap,
  wrapperClassName,
  canvasClassName,
}: MetaDiagramProps) => {
  const classes = useStyles();

  // set up the diagram engine
  const engine = createEngine();

  engine
    .getNodeFactories()
    // @ts-ignore
    .registerFactory(new MetaNodeFactory(componentsMap.nodes));

  engine
    .getLinkFactories()
    // @ts-ignore
    .registerFactory(new MetaLinkFactory(componentsMap.links));

  // set up the diagram model

  const model = new DiagramModel();
  const nodes = metaNodes.map(
    mn => new MetaNodeModel(Object.fromEntries(mn.options.options))
  );
  const links = metaLinks
    .map(ml => getLinkModel(ml, nodes))
    .filter(mlm => mlm !== undefined);
  // @ts-ignore
  model.addAll(...nodes, ...links);

  // load model into engine
  engine.setModel(model);

  const containerClassName = wrapperClassName
    ? wrapperClassName
    : classes.container;
  const diagramClassName = canvasClassName
    ? canvasClassName
    : classes.canvasContainer;
  return (
    <div className={containerClassName}>
      <CanvasWidget className={diagramClassName} engine={engine} />
    </div>
  );
};

export default MetaDiagram;
export { MetaNode, MetaLink, MetaNodeModel, ComponentsMap };
export { MetaLinkModel } from './react-diagrams/MetaLinkModel';
export { Position } from './models/Position';
