import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { MetaNode } from './models/MetaNode';
import { MetaLink } from './models/MetaLink';
import { MetaPort } from './models/MetaPort';
import CssBaseline from '@mui/material/CssBaseline';
import { ComponentsMap } from './models/ComponentsMap';
import { LinkModel, PortWidget } from '@projectstorm/react-diagrams';
import { MetaNodeModel } from './react-diagrams/MetaNodeModel';
import { MetaNodeFactory } from './react-diagrams/MetaNodeFactory';
import { MetaLinkFactory } from './react-diagrams/MetaLinkFactory';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import theme from './theme';
import { DefaultSidebarNodeTypes, EventTypes } from './constants';
import { CanvasWidget } from './components/CanvasWidget';
import { MetaLinkModel } from './react-diagrams/MetaLinkModel';
import { DefaultState } from './react-diagrams/state/DefaultState';
import { ISidebarProps } from './types/sidebar';
import Sidebar from './components/sidebar/Sidebar';
import { InputType } from '@projectstorm/react-canvas-core';

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
  metaNodes: MetaNodeModel[];
  metaLinks: MetaLinkModel[];
  componentsMap: ComponentsMap;
  sidebarProps?: ISidebarProps;
  wrapperClassName?: string;
  canvasClassName?: string;
  metaTheme: {
    customThemeVariables: {};
    canvasClassName: string;
  };
  metaCallback?: Function;
  onMount?: Function;
  globalProps?: any;
}

const MetaDiagram = forwardRef(
  (
    {
      metaNodes,
      metaLinks,
      componentsMap,
      wrapperClassName,
      metaTheme,
      sidebarProps,
      metaCallback,
      onMount,
      globalProps,
    }: MetaDiagramProps,
    ref
  ) => {
    const classes = useStyles();
    const linkRef = React.useRef<any>();

    // initialize custom diagram state
    const state = new DefaultState(globalProps?.createLink);

    // Sets up the diagram engine
    // By using useMemo, we ensure that the createEngine() function is only called when the component mounts,
    // and the same engine instance is reused on subsequent re-renders.
    const engine = useMemo(() => createEngine(), []);

    if (metaCallback === undefined) {
      metaCallback = (node: any) => {
        console.log(node);
      };
    }

    // register factories
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

    // remove any previous listeners from nodes
    metaNodes.forEach((node: any) => {
      const listenerIds = Object.keys(node.listeners);
      listenerIds.forEach(id => {
        const listener = node.listeners[id];
        Object.keys(listener).forEach(event => {
          if (
            event === 'nodeUpdated' ||
            event === 'eventDidFire' ||
            event === 'eventWillFire'
          ) {
            node.deregisterListener(listener[event]);
          }
        });
      });
      node.listeners = {};
    });

    // add all entities to the model
    let models = model.addAll(...metaNodes, ...metaLinks);

    // define callbacks

    let preCallback = (event: any) => {
      event.metaEvent = EventTypes.PRE_UPDATE;
      // @ts-ignore
      let repaint = metaCallback(event);
      if (repaint) {
        engine.repaintCanvas();
      }
    };

    let postCallback = (event: any) => {
      event.metaEvent = EventTypes.POST_UPDATE;
      // @ts-ignore
      let repaint = metaCallback(event);
      if (repaint) {
        engine.repaintCanvas();
      }
    };

    let removeNotValidLink = () => {
      const link: LinkModel = linkRef.current.link;
      const sourcePort = link.getSourcePort();
      const targetPort = link.getTargetPort();
      if (sourcePort && !targetPort) {
        model.removeLink(link);
      }
      linkRef.current = null;
    };

    // add listeners to the nodes
    const registerNodeListeners = (node: any) => {
      node.registerListener({
        nodeUpdated: postCallback,
        eventDidFire: postCallback,
        eventWillFire: preCallback,
      });
    };

    models.forEach((item: any) => {
      registerNodeListeners(item);
    });

    // add listeners to the model
    model.registerListener({
      nodeUpdated: postCallback,
      eventDidFire: postCallback,
      eventWillFire: preCallback,
      linksUpdated: (event: any) => {
        linkRef.current = event;
      },
    });

    const clearSelection = () => {
      engine.getModel().clearSelection();
    };

    // update state selection state
    const updateSelection = (id: string) => {
      const startsWithSelect = id
        .toLowerCase()
        .startsWith(DefaultSidebarNodeTypes.SELECT);

      if (id !== DefaultSidebarNodeTypes.CREATE_LINK && !!linkRef.current) {
        removeNotValidLink();
      }

      if (startsWithSelect && !Boolean(state.isSelection)) {
        state.isSelection = true;
      } else if (startsWithSelect && Boolean(state.isSelection)) {
        return;
      } else if (state.isSelection) {
        clearSelection();
        state.isSelection = false;
      }
    };

    // load model into engine
    engine.setModel(model);

    // Use this custom "DefaultState" instead of the actual default state we get with the engine
    engine.getStateMachine().pushState(state);

    // check globalProps for any actions to perform
    if (globalProps !== undefined) {
      if (globalProps?.disableDeleteDefaultKey) {
        const actions = engine
          .getActionEventBus()
          .getActionsForType(InputType.KEY_DOWN);
        actions.forEach((action: any) => {
          // needs to find a better approach for this but for now this will do
          if (action.constructor.name === 'DeleteItemsAction') {
            engine.getActionEventBus().deregisterAction(action);
          }
        });
      }
    }

    useEffect(() => {
      if (onMount === undefined) {
        onMount = (engine: any) => {
          console.log(engine);
        };
      }
      onMount(engine);
    }, []);

    // expose api
    const addNode = (node: any) => {
      node.registerListener({
        nodeUpdated: postCallback,
        eventDidFire: postCallback,
        eventWillFire: preCallback,
      });
      engine.getModel().addNode(node);
    };
    useImperativeHandle(ref, () => ({
      addNode,
    }));

    // render
    const containerClassName = wrapperClassName
      ? wrapperClassName
      : classes.container;

    return (
      <ThemeProvider
        theme={createTheme(theme(metaTheme?.customThemeVariables))}
      >
        <DndProvider backend={HTML5Backend}>
          <CssBaseline />
          <Box className={containerClassName} ref={ref}>
            <Sidebar
              {...sidebarProps}
              engine={engine}
              updateSelection={updateSelection}
            />{' '}
            <CanvasWidget
              engine={engine}
              className={metaTheme?.canvasClassName}
            />
          </Box>
        </DndProvider>
      </ThemeProvider>
    );
  }
);

export default MetaDiagram;
export { MetaNode, MetaLink, MetaPort, MetaNodeModel, ComponentsMap };
export { PortWidget };
export { MetaLinkModel } from './react-diagrams/MetaLinkModel';
export { PortTypes } from './constants';
export { CallbackTypes } from './constants';
export { EventTypes, DefaultSidebarNodeTypes } from './constants';
