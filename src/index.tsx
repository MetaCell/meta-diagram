import * as React from 'react';
import Sidebar, { ISidebarNode } from './components/Sidebar';
import { MetaNode } from './models/MetaNode';
import { MetaLink } from './models/MetaLink';
import { MetaPort } from './models/MetaPort';
import CssBaseline from '@mui/material/CssBaseline';
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
// import {useEffect} from "react";
import theme from './theme';
import { EventTypes } from './constants';

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
  sidebarNodes?: ISidebarNode[];
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
  sidebarNodes,
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


  // set up the diagram model
  const model = new DiagramModel();
  const nodes = metaNodes;
  const links = metaLinks;

  // @ts-ignore
  let models = model.addAll(...nodes, ...links);

  let preCallback = (event: any) => {
    event.metaEvent = EventTypes.PRE_UPDATE;
    // @ts-ignore
    metaCallback(event);
  };

  let postCallback = (event: any) => {
    event.metaEvent = EventTypes.POST_UPDATE;
    // @ts-ignore
    let repaint = metaCallback(event);
    if (repaint) {
      engine.repaintCanvas();
    }

  };

  // add listeners to the model and children
  models.forEach((item:any) => {
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

  // useEffect(() => {
  //   // @ts-ignore
  //   metaGraph.updateNodesContainerBoundingBoxes(model.getNodes(), metaGraph)
  // }, [])


  const containerClassName = wrapperClassName
    ? wrapperClassName
    : classes.container;

  return (
    <ThemeProvider theme={createTheme(theme(metaTheme?.customThemeVariables))}>
      <CssBaseline />
      <Box className={containerClassName}>
        <Sidebar sidebarNodes={sidebarNodes} />
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
export { BoundingBox } from './models/BoundingBox';
