import * as React from 'react';
import Sidebar from './components/Sidebar';
import { MetaNode } from './models/MetaNode';
import { MetaLink } from './models/MetaLink';
import { MetaPort } from './models/MetaPort';
import CssBaseline from '@mui/material/CssBaseline';
import { getLinkModel } from './helpers/linksHelper';
import { ComponentsMap } from './models/ComponentsMap';
import { PortWidget } from '@projectstorm/react-diagrams';
import { MetaNodeModel } from './react-diagrams/MetaNodeModel';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { MetaNodeFactory } from './react-diagrams/MetaNodeFactory';
import { MetaLinkFactory } from './react-diagrams/MetaLinkFactory';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import {generateMetaGraph} from "./helpers/nodesHelper";
import {useEffect} from "react";
import theme from './theme';
import { CallbackTypes, EventTypes } from './constants';

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
  metaCallback?: Function;
}

const MetaDiagram = ({
  metaNodes,
  metaLinks,
  componentsMap,
  wrapperClassName,
  metaTheme,
  metaCallback,
}: MetaDiagramProps) => {
  const classes = useStyles();

  // set up the diagram engine
  const engine = createEngine();

  if (metaCallback === undefined) {
    metaCallback = (node: any) => {console.log(node)}
  }

  engine
    .getNodeFactories()
    // @ts-ignore
    .registerFactory(new MetaNodeFactory(componentsMap.nodes));

  engine
    .getLinkFactories()
    // @ts-ignore
    .registerFactory(new MetaLinkFactory(componentsMap.links));

  const metaGraph = generateMetaGraph(metaNodes)

  // set up the diagram model
  const model = new DiagramModel();
  const nodes = metaGraph.getNodes()
  const links = metaLinks
    .map(ml => getLinkModel(ml, metaGraph))
    .filter(mlm => mlm !== undefined);

  // @ts-ignore
  let models = model.addAll(...nodes, ...links);

  let preCallback = (event: any) => {
    event.metaEvent = EventTypes.PRE_UPDATE;
    // @ts-ignore
    metaCallback(event);
  };

  let postCallback = (event: any) => {
    event.metaEvent = EventTypes.POST_UPDATE;

    switch (event.function) {
      case CallbackTypes.POSITION_CHANGED: {
        const node = event.entity
        metaGraph.handleNodePositionChanged(node)
        engine.repaintCanvas();
        break;
      }
      default: {
        break;
      }
    }
    // @ts-ignore
    metaCallback(event);
  };

  // add listeners to the model and children
  models.forEach((item) => {
		item.registerListener({
			nodeUpdated: postCallback,
      eventDidFire: postCallback,
      eventWillFire: preCallback
		});
	});

	model.registerListener({
		nodeUpdated: postCallback,
    eventDidFire: postCallback,
    eventWillFire: preCallback
	});

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
          className={`canvas-widget ${metaTheme?.canvasClassName}`}
          engine={engine}
        />
      </Box>
    </ThemeProvider>
  );
};

export default MetaDiagram;
export { MetaNode, MetaLink, MetaPort, MetaNodeModel, ComponentsMap };
export { PortWidget };
export { MetaLinkModel } from './react-diagrams/MetaLinkModel';
export { Position } from './models/Position';
export { PortTypes } from './constants';
export { CallbackTypes } from './constants';
export { EventTypes } from './constants';
