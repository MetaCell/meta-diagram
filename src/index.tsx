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
import { makeStyles } from '@mui/styles';
import Sidebar from './components/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { Box } from '@mui/material';
import {generateMetaGraph, registerPositionListener} from "./helpers/nodesHelper";
import {useEffect} from "react";

const useStyles = makeStyles(_ => ({
  container: {
    height: '100%',
    width: '100%',
  },
  canvasContainer: {
    height: '100%',
    width: '100%',
    background: '#fffff',
  },
}));

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

const MetaDiagram = ({
  metaNodes,
  metaLinks,
  componentsMap,
  wrapperClassName,
  metaTheme,
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

  const metaGraph = generateMetaGraph(metaNodes)
  // TODO: Internally add children to metaNode

  const repaintCanvas = (event: any) => {
    const node = event.entity
    metaGraph.handleNodePositionChanged(node)
    // TODO: We might not need the full canvas to be repainted
    engine.repaintCanvas();
  }


  // set up the diagram model

  const model = new DiagramModel();

  const nodes = metaGraph.getNodes()
  registerPositionListener(nodes, repaintCanvas)

  const links = metaLinks
    .map(ml => getLinkModel(ml, metaGraph))
    .filter(mlm => mlm !== undefined);

  // @ts-ignore
  model.addAll(...nodes, ...links);

  // load model into engine
  engine.setModel(model);

  // TODO: Update metagraph on prop changes
  // We can start by generating a completely new graph
  // Later on we can optimize to detect what changed

  useEffect(() => {
    // @ts-ignore
    metaGraph.updateNodesContainerBoundingBoxes(model.getNodes(), metaGraph)
  }, [])


  const containerClassName = wrapperClassName
    ? wrapperClassName
    : classes.container;

  return (
    <ThemeProvider theme={createTheme(theme(metaTheme?.customThemeVariables))}>
      <CssBaseline />
      <Box className={containerClassName}>
        <Sidebar />
        <CanvasWidget
          className={`${classes.canvasContainer} ${metaTheme?.canvasClassName}`}
          engine={engine}
        />
      </Box>
    </ThemeProvider>
  );
};

export default MetaDiagram;
export { MetaNode, MetaLink, MetaNodeModel, ComponentsMap };
export { MetaLinkModel } from './react-diagrams/MetaLinkModel';
export { Position } from './models/Position';
